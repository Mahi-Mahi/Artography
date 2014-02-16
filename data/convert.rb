#!/usr/bin/env ruby
# encoding: utf-8

Encoding.default_external = Encoding::UTF_8
Encoding.default_internal = Encoding::UTF_8


require 'csv'
require 'json'
require 'pp'
require 'zlib'
require 'fileutils'

production = false

FileUtils.rm_rf("json/.", secure: true)
FileUtils.rm_rf("../source/data", secure: true)

artists = {}
countries = {}

expos = {}
years = []

idx = 0

CSV.foreach('csv/expos.csv') do |row|

	idx = idx + 1

	break if row.nil?
	break if row[0].nil?
	# break if idx > 3000

	next unless idx > 1

	artist = {}
	artist[:id] = row[0].to_i
	artist[:name] = row[2]
	# artist[:country] = row[8]

	next if artist[:country] == 'France'

	country = row[8].downcase.gsub(/[^\w]/, '-')
	countries[country] = row[8]

	artists[artist[:id]] = artist

	expo = {}
	expo[:id] = artist[:id]
	expo[:age] = artist[:age]
	expo[:sex] = artist[:sex]
	expo[:country] = country
	# expo[:start] = row[4]
	# expo[:end] = row[5]


	[row[4], row[5]].each do |expo_year|
		begin
			expo_year = Date.strptime(expo_year, '%Y-%m-%d').year
			expos[expo_year] = [] if expos[expo_year].nil?
			expos[expo_year] << expo
			years << expo_year
		rescue
			p "invalid date"
			p row
		end
	end

	begin
		if Date.strptime(row[4], '%Y-%m-%d') < Date.today && Date.strptime(row[5], '%Y-%m-%d') > Date.today 
			expos[:today] = [] if expos[:today].nil?
			expos[:today] << expo
		end
	rescue
	end
	# expos << expo

end

puts "#{artists.length} artists"

years.uniq!

# Years
years.each do |year|
	filename = "json/years.json"
	content = production ? years.to_json : JSON.pretty_generate(years)
	File.open(filename, 'w') { |file| file.write content }
end

# Countries
countries.each do |country|
	filename = "json/countries.json"
	content = production ? countries.to_json : JSON.pretty_generate(countries)
	File.open(filename, 'w') { |file| file.write content }
end


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


FileUtils.mkdir_p "../source/data"
FileUtils.cp_r("json/expos", "../source/data/expos")
FileUtils.cp_r("json/artists", "../source/data/artists")




