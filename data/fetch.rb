#!/usr/bin/env ruby
# encoding: utf-8

Encoding.default_external = Encoding::UTF_8
Encoding.default_internal = Encoding::UTF_8


require 'csv'
require 'json'
require 'pp'
require 'zlib'
require 'fileutils'
require 'countries'
# require 'httparty'
# require 'httpclient'
# require 'curb'
require 'httpi'
require 'time_diff'

production = false

@cache_path = "_cache"

FileUtils.mkdir_p @cache_path

def fetch(path)

	content_file = "#{@cache_path}#{path}"

	unless File.exists?(content_file)

		HTTPI.adapter = :curb

		artfact = HTTPI::Request.new(url: "https://institut-francais-api.artfacts.net/#{path}")
		artfact.auth.basic('institutfrancais', '0sPkcusDTHqSbGJjlUB4')

		content = HTTPI.get(artfact).body

		FileUtils.mkdir_p File.dirname(content_file)

		File.write(content_file, content)
	end

	res = JSON.parse(File.read(content_file))

end

def normalize_country(country)

	c = country.downcase.gsub(/[^\w]+/, '-').gsub(/[^\w]$/, '')

	case c
	when 'ivory-coast'
		country = "Côte d'ivoire"
	when 'palestinian-territories'
		country = "Palestinian Territory, Occupied"
	when 'kosovo'
		country = "Kosovo"
		# c = {continent: 'Europe', alpha2: 'XK', translations: {fr: 'Kosovo', en: 'Kosovo'}}
	when 'reunion'
		country = 'Réunion'
	when 'south-korea'
		country = 'Korea (South)'
	when 'usa'
		country = 'United States'
	when 'ireland-republic'
		country = 'Ireland'
	else
		country = country
	end

	country

end

country_prepositions = {}
JSON.parse(open("country_prepositions.json").read).each do |c|
	country_prepositions[c['code']] = c['french_preposition'].downcase
end

artists = {}
continents = {}
expo_types = []
expo_show_types = []

expos = {
	today: []
}
years = []

fairs = {2014 => []}
galleries = {}

today_expos = []
today_fairs = {
	countries: {},
	galleries: {}
}

af_galleries = fetch('/v0/gallery/list')

pp "#{af_galleries.length} galleries"

nb_datas = 50

af_galleries.shuffle.slice(0, nb_datas).each do |gallery|

	print '.'

	gallery[:fairs] = {}

	fetch("/v0/gallery/#{gallery['id']}/fairs").each do |af_fair|

		next if af_fair.class == Array

		# begin

			country = normalize_country(af_fair['country'])

			c = Country.find_country_by_name(country)

			unless c.nil?

				begin
					continents[c.continent] = {} if continents[c.continent].nil?
					continents[c.continent][c.alpha2] = {
						:fr => c.translations['fr'],
						:fr_prefix => country_prepositions[c.alpha2.downcase],
						:en => c.translations['en']
					}
				rescue
				end

				fair = {}
				fair_detail = {}
				fair[:i] = gallery['id'].gsub(/ /, '-')
				fair_detail[:i] = "#{gallery['id']}-#{af_fair['title']}"
				begin
					fair[:c] = c.alpha2
					fair_detail[:c] = c.alpha2
				rescue
				end

				fair_detail[:n] = af_fair['title'].gsub(/\\/, '')
				fair_detail[:ct] = af_fair['city']

				af_fair['year'] = af_fair['year'].to_i

				fairs[af_fair['year']] = [] if fairs[af_fair['year']].nil?
				fairs[af_fair['year']] << fair unless fairs[af_fair['year']].include?(fair)

				years << af_fair['year'] unless af_fair['year'] > Date.today.year

				gallery[:fairs][af_fair['year']] = [] if gallery[:fairs][af_fair['year']].nil?
				if af_fair['country'] == 'France'
					gallery[:fairs][af_fair['year']] << {i: fair_detail[:i], c: 'FR'}
				else
					gallery[:fairs][af_fair['year']] << fair_detail unless gallery[:fairs][af_fair['year']].include?(fair_detail)

					p af_fair['year']

					if af_fair['year'] == Date.today.year
						p fair
						today_fairs[:countries] << fair_detail[:c] unless today_fairs[:countries].include?(fair_detail[:c])
						today_fairs[:galleries] << fair[:i] unless today_fairs[:galleries].include?(fair[:i])
					end
				end

			end
		# rescue
			# p gallery
			# p af_fair
		# end

	end

	galleries[gallery['id']] = gallery

end

p today_fairs

p "in #{Date.today.year}, #{today_fairs[:galleries].length} exposent dans #{today_fairs[:countries].length}"


af_artists = fetch('/v0/artist/list')

pp "#{af_artists.length} artists"

af_artists.shuffle.slice(0, nb_datas).each do |artist|

	print '.'

	name = artist['name'].split(/ /)
	artist[:first_name] = name[0]
	artist[:last_name] = name[1].nil? ? '' : name[1]
	case artist['attributes']
	when 'Male'
		artist[:genre] = 'm'
	when 'Female'
		artist[:genre] = 'f'
	else
		artist[:genre] = 'c'
	end

	begin
		artist['birth month'] = 1 if !artist['birth month'] or artist['birth month'] == '0'
		artist['birth day'] = 1 if !artist['birth day'] or artist['birth day'] == '0'
		birthDate = Date.strptime("#{artist['birth year']}-#{artist['birth month']?artist['birth month']:1}-#{artist['birth day']?artist['birth day']:1}", '%Y-%m-%d')
		artist[:birthDate] = birthDate.to_s
		artist[:age] = Time.diff(Time.now, birthDate)[:year]
		if artist[:age] < 26
			artist[:age_range] = '0-25'
		elsif artist[:age] < 41
			artist[:age_range] = '26-40'
		elsif artist[:age] < 61
			artist[:age_range] = '41-60'
		else
			artist[:age_range] = '61-100'
		end
	rescue
		p "Invalid date"
		pp "#{artist['birth year']} #{artist['birth month']} #{artist['birth day']}"
	end

	artist[:expos] = {}

	fetch("/v0/artist/#{artist['id']}/exhibitions").each do |af_expo|

		next if af_expo.class == Array

		# begin

			unless af_expo['country'].nil?
				country = normalize_country(af_expo['country'])

				c = Country.find_country_by_name(country)

				unless c.nil?

					begin
						continents[c.continent] = {} if continents[c.continent].nil?
						continents[c.continent][c.alpha2] = {
							:fr => c.translations['fr'],
							:fr_prefix => country_prepositions[c.alpha2.downcase],
							:en => c.translations['en']
						}
					rescue
					end

					expo = {}
					expo_detail = {}
					expo[:i] = artist['id']
					expo_detail[:i] = "#{artist['id']}-#{af_expo['galleryID']}-#{af_expo['BeginDate']}"
					begin
						expo[:c] = c.alpha2
						expo_detail[:c] = c.alpha2
					rescue
					end

					expo[:g] = artist[:genre]
					expo[:a] = artist[:age_range]

					expo_detail[:n] = af_expo['Title']

					case af_expo['type']
					when "Public Institution"
						expo_detail[:t] = 'Institution publique'
				    when "Private Gallery"
						expo_detail[:t] = 'Galerie privée'
				    when "Biennial, Triennial etc."
				    when "Art Fair"
						expo_detail[:t] = 'Grande manifestation'
					when
						expo_detail[:t] = 'Autre'
					end

					expo_detail[:st] = af_expo['show-type']
					expo_detail[:ct] = af_expo['city']
					expo_detail[:o] = af_expo['organizer']
					expo_detail[:d] = [af_expo['BeginDate'], af_expo['EndDate']]

					expo_types << af_expo['type'] unless af_expo['type'].nil? #expo_types.include?(af_expo['type'])
					expo_show_types << af_expo['show-type'] unless af_expo['show-type'].nil? #expo_show_types.include?(expo_show_types['show-type'])
					expo_types.uniq!
					expo_show_types.uniq!

					[af_expo['BeginDate'], af_expo['EndDate']].uniq.each do |expo_year|
						begin
							expo_year = '2100-01-01' if expo_year == 'NA' or expo_year == '0000-00-00'
							expo_year.gsub!(/(\d+) 0 0$/, "\\1-01-01")
							expo_year = Date.strptime(expo_year, '%Y-%m-%d').year
							expos[expo_year] = [] if expos[expo_year].nil?
							expos[expo_year] << expo unless expos[expo_year].include?(expo)
							years << expo_year unless expo_year > Date.today.year

							artist[:expos][expo_year] = [] if artist[:expos][expo_year].nil?
							if af_expo['country'] == 'France'
								artist[:expos][expo_year] << {i: expo_detail[:i], c: 'FR'}
							else
								artist[:expos][expo_year] << expo_detail unless artist[:expos][expo_year].include?(expo_detail)
							end

						rescue
							puts "invalid date"
							p af_expo
							p expo_year
						end
					end

					begin
						if Date.strptime(af_expo['BeginDate'], '%Y-%m-%d') < Date.today && Date.strptime(af_expo['EndDate'], '%Y-%m-%d') > Date.today
							expos[:today] = [] if expos[:today].nil?
							expos[:today] << expo unless expos[:today].include?(expo)

							if af_expo['country'] == 'France'
								artist[:expos][:today] << {i: expo_detail[:i], c: 'FR'}
							else
								artist[:expos][:today] << expo_detail unless artist[:expos][:today].include?(expo_detail)
							end

						end
					rescue
					end

				end
			end
		# rescue
		# 	p artist
		# 	p af_expo
		# end

	end

	artists[artist['id']] = artist

end



FileUtils.rm_rf("json/.", secure: true)

years.uniq!.sort!.reverse!
# Years
filename = "json/years.json"
content = production ? years.to_json : JSON.pretty_generate(years)
File.open(filename, 'w') { |file| file.write content }

# Countries
continents.each do |continent, countries|
	continents[continent] = Hash[countries.sort]
end
continents = Hash[continents.sort]
filename = "json/countries.json"
content = production ? continents.to_json : JSON.pretty_generate(continents)
File.open(filename, 'w') { |file| file.write content }

# Artists
FileUtils.mkdir_p "json/artists"
artists_name = {}
artists.sort_by{|k, v| v[:last_name]}.each do |artist_id, artist|
	unless artist['country'] == 'FR'
		artists_name[artist_id.to_i] = artist['name']
		filename = "json/artists/#{artist_id}.json"
		content = production ? artist.to_json : JSON.pretty_generate(artist)
		File.open(filename, 'w') { |file| file.write content }
		# Zlib::GzipWriter.open("#{filename}.gz") { |file| file.write content }
	end
end
filename = "json/artists/names.json"
content = production ? artists_name.to_json : JSON.pretty_generate(artists_name)
File.open(filename, 'w') { |file| file.write content }

# Expos
FileUtils.mkdir_p "json/expos"
expos.each do |year,year_artists|
	next if year_artists.nil?
	filename = "json/expos/#{year}.json"
	content = production ? year_artists.to_json : JSON.pretty_generate(year_artists)
	File.open(filename, 'w') { |file| file.write content }
	# Zlib::GzipWriter.open("#{filename}.gz") { |file| file.write content }
end


# Galleries
FileUtils.mkdir_p "json/galleries"
galleries_name = {}
galleries.sort_by{|k, v| v[:name]}.each do |gallery_id, gallery|
	unless gallery['country'] == 'FR'
		galleries_name[gallery_id.to_i] = gallery['name']
		filename = "json/galleries/#{gallery_id}.json"
		content = production ? gallery.to_json : JSON.pretty_generate(gallery)
		File.open(filename, 'w') { |file| file.write content }
		# Zlib::GzipWriter.open("#{filename}.gz") { |file| file.write content }
	end
end
filename = "json/galleries/names.json"
content = production ? galleries_name.to_json : JSON.pretty_generate(galleries_name)
File.open(filename, 'w') { |file| file.write content }

# Fairs
FileUtils.mkdir_p "json/fairs"
fairs.each do |year,year_galleries|
	next if year_galleries.nil?
	filename = "json/fairs/#{year}.json"
	content = production ? year_galleries.to_json : JSON.pretty_generate(year_galleries)
	File.open(filename, 'w') { |file| file.write content }
	# Zlib::GzipWriter.open("#{filename}.gz") { |file| file.write content }
end


puts "#{years.length} years"
puts "#{artists.length} artists"
puts "#{expos.flatten.length} expos"
puts "#{galleries.length} galleries"
puts "#{fairs.flatten.length} fairs"


puts "expo_types"
p expo_types

puts "expo_show_types"
p expo_show_types


FileUtils.rm_rf("../source/data", secure: true)
FileUtils.mkdir_p "../source/data"
FileUtils.cp("json/years.json", "../source/data/years.json")
FileUtils.cp("json/countries.json", "../source/data/countries.json")
FileUtils.cp_r("json/expos", "../source/data/expos")
FileUtils.cp_r("json/artists", "../source/data/artists")
FileUtils.cp_r("json/fairs", "../source/data/fairs")
FileUtils.cp_r("json/galleries", "../source/data/galleries")




