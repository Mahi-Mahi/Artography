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
FileUtils.rm Dir.glob('json/*.json')
FileUtils.rm Dir.glob('json/*.gz')

artists = {}
countries = {}

expos = []

idx = 0

CSV.foreach('csv/expos.csv') do |row|

	break if row.nil?
	break if row[0].nil?

	if idx > 0

		artist = {}
		artist[:id] = row[0].to_i
		artist[:name] = row[2]
		artist[:country] = row[8]

		artists[artist[:id]] = artist

		expo = {}
		expo[:artist_id] = artist[:id]
		expo[:artist_age] = artist[:age]
		expo[:artist_sex] = artist[:sex]
		expo[:expo_year] = artist[:beginyear]...artist[:endyear]

		countries[artist[:country]] = [] if countries[artist[:country]].nil?
		countries[artist[:country]] << artist[:id] unless countries[artist[:country]].include?(artist[:id])

		expos << expo

	end

	idx = idx + 1

	break if idx > 3000
end

puts "#{artists.length} artists"

countries.delete('France')

# Countries

filename = "json/countries.json"
content = production ? countries.to_json : JSON.pretty_generate(countries)
File.open(filename, 'w') { |file| file.write content }
Zlib::GzipWriter.open("#{filename}.gz") { |file| file.write content }

# Expos

filename = "json/expos.json"
content = production ? expos.to_json : JSON.pretty_generate(expos)
File.open(filename, 'w') { |file| file.write content }
Zlib::GzipWriter.open("#{filename}.gz") { |file| file.write content }


FileUtils.copy("json/expos.json", "../source/data/expos.json")




