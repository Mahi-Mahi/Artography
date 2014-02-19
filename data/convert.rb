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

production = false

FileUtils.rm_rf("json/.", secure: true)
FileUtils.rm_rf("../source/data", secure: true)

artists = {}
continents = {}

expos = {
	today: []
}
years = []

idx = 0

CSV.foreach('csv/expos.csv') do |row|

	idx = idx + 1

	break if row.nil?
	break if row[0].nil?
	break if idx > 2500

	next unless idx > 1

	artist = {}
	artist[:id] = row[0].to_i
	artist[:name] = row[2]
	# artist[:country] = row[8]

	next if artist[:country] == 'France'


	case row[8].downcase.gsub(/[^\w]+/, '-').gsub(/[^\w]$/, '')
	when 'ivory-coast'
		country = "Côte d'ivoire"
	when 'palestinian-territories'
		country = "Palestinian Territory, Occupied"
	when 'kosovo'
		country = "Kosovo"
		k = {continent: 'Europe', alpha2: 'XK', translations: {fr: 'Kosovo', en: 'Kosovo'}}
	when 'reunion'
		country = 'Réunion'
	when 'south-korea'
		country = 'Korea (South)'
	when 'usa'
		country = 'United States'
	when 'ireland-republic'
		country = 'Ireland'
	else
		country = row[8]
	end

	c = Country.find_country_by_name(country)
	if c.nil?
		puts "not found : #{country}"
		c = k
	end
	begin
		continents[c.continent] = {} if continents[c.continent].nil?
		continents[c.continent][c.alpha2] = {
			:fr => c.translations['fr'],
			:en => c.translations['en']
		}
	rescue
	end

	artists[artist[:id]] = artist

	expo = {}
	expo[:i] = artist[:id]
	expo[:c] = c.alpha2
	# TODO
	# expo[:a] = artist[:age]
	# expo[:s] = artist[:sex]
	# expo[:start] = row[4]
	# expo[:end] = row[5]

	[row[4], row[5]].uniq.each do |expo_year|
		begin
			expo_year = '2100-01-01' if expo_year == 'NA'
			expo_year = Date.strptime(expo_year, '%Y-%m-%d').year
			expos[expo_year] = [] if expos[expo_year].nil?
			expos[expo_year] << expo unless expos[expo_year].include?(expo)
			years << expo_year unless expo_year > Date.today.year
		rescue
			puts "invalid date"
			p row
		end
	end

	begin
		if Date.strptime(row[4], '%Y-%m-%d') < Date.today && Date.strptime(row[5], '%Y-%m-%d') > Date.today
			expos[:today] = [] if expos[:today].nil?
			expos[:today] << expo unless expos[:today].include?(expo)
		end
	rescue
	end
	# expos << expo

end

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
artists.each do |artist_id, artist|
	filename = "json/artists/#{artist_id}.json"
	content = production ? artist.to_json : JSON.pretty_generate(artist)
	File.open(filename, 'w') { |file| file.write content }
	# Zlib::GzipWriter.open("#{filename}.gz") { |file| file.write content }
end

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


FileUtils.mkdir_p "../source/data"
FileUtils.cp("json/years.json", "../source/data/years.json")
FileUtils.cp("json/countries.json", "../source/data/countries.json")
FileUtils.cp_r("json/expos", "../source/data/expos")
FileUtils.cp_r("json/artists", "../source/data/artists")




