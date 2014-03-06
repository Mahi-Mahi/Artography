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


artists = {}
continents = {}

expos = {
	today: []
}
years = []


af_artists = fetch('/v0/artist/list')


af_artists.shuffle.slice(0,500).each do |artist|

	pp artist['name']
	name = artist['name'].split(/ /)
	p name
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
		birthDate = Date.strptime("#{artist['birth year']}-#{artist['birth month']?artist['birth month']:1}-#{artist['birth day']?artist['birth day']:1}", '%Y-%m-%d')
		artist[:birthDate] = birthDate.to_s
		age = Time.diff(Time.now, birthDate)[:year]
		if age < 26
			artist[:age] = '0-25'
		elsif age < 36
			artist[:age] = '26-35'
		elsif age < 46
			artist[:age] = '36-45'
		else
			artist[:age] = '46-55'
		end
	rescue
		p "Invalid date"
		# pp artist
	end
	pp artist[:birthDate]
	pp artist[:age]
	pp artist[:genre]

	fetch("/v0/artist/#{artist['id']}/exhibitions").each do |af_expo|

		begin

			next if af_expo['country'] == 'France'

			country = normalize_country(af_expo['country'])

			c = Country.find_country_by_name(country)

			unless c.nil?

				begin
					continents[c.continent] = {} if continents[c.continent].nil?
					continents[c.continent][c.alpha2] = {
						:fr => c.translations['fr'],
						:en => c.translations['en']
					}
				rescue
				end

				artists[artist['id']] = artist

				expo = {}
				expo[:i] = artist['id']
				begin
					expo[:c] = c.alpha2
				rescue
				end
				# TODO
				expo[:g] = artist[:genre]
				expo[:a] = artist[:age]

				[af_expo['BeginDate'], af_expo['EndDate']].uniq.each do |expo_year|
					begin
						expo_year = '2100-01-01' if expo_year == 'NA'
						expo_year = Date.strptime(expo_year, '%Y-%m-%d').year
						expos[expo_year] = [] if expos[expo_year].nil?
						expos[expo_year] << expo unless expos[expo_year].include?(expo)
						years << expo_year unless expo_year > Date.today.year
					rescue
						puts "invalid date"
						p af_expo
					end
				end

				begin
					if Date.strptime(af_expo['BeginDate'], '%Y-%m-%d') < Date.today && Date.strptime(af_expo['EndDate'], '%Y-%m-%d') > Date.today
						expos[:today] = [] if expos[:today].nil?
						expos[:today] << expo unless expos[:today].include?(expo)
					end
				rescue
				end
			end
		rescue
			p artist
			p af_expo
		end

	end

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
p artists
artists_name = {}
artists.sort_by{|k, v| v[:last_name]}.each do |artist_id, artist|
	artists_name[artist_id.to_i] = artist['name']
	filename = "json/artists/#{artist_id}.json"
	content = production ? artist.to_json : JSON.pretty_generate(artist)
	File.open(filename, 'w') { |file| file.write content }
	# Zlib::GzipWriter.open("#{filename}.gz") { |file| file.write content }
end
p artists_name
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


puts "#{artists.length} artists"
puts "#{years.length} years"


FileUtils.rm_rf("../source/data", secure: true)
FileUtils.mkdir_p "../source/data"
FileUtils.cp("json/years.json", "../source/data/years.json")
FileUtils.cp("json/countries.json", "../source/data/countries.json")
FileUtils.cp_r("json/expos", "../source/data/expos")
FileUtils.cp_r("json/artists", "../source/data/artists")




