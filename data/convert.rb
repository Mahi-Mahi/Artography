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

	idx = idx + 1

	break if row.nil?
	break if row[0].nil?
	# break if idx > 3000

	next unless idx > 1

	artist = {}
	artist[:id] = row[0].to_i
	artist[:name] = row[2]
	artist[:country] = row[8]

	next if artist[:country] == 'France'

	artists[artist[:id]] = artist

	expo = {}
	expo[:id] = artist[:id]
	expo[:age] = artist[:age]
	expo[:sex] = artist[:sex]
	expo[:country] = artist[:country]
	expo[:start] = row[4]
	expo[:end] = row[5]

	countries[artist[:country]] = [] if countries[artist[:country]].nil?
	countries[artist[:country]] << artist[:id] unless countries[artist[:country]].include?(artist[:id])

	expos << expo



end

puts "#{artists.length} artists"
puts "#{countries.length} countries"

# puts countries.keys.uniq.sort

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




