
http_path = "/"
css_dir = "css"
sass_dir = "scss"
images_dir = "source/assets/images"
http_generated_images_path = "assets/images"
http_images_path = "/arts-visuels/assets/images"

environment = :production
preferred_syntax = :scss
output_style = :nested
asset_cache_buster :none

require 'fileutils'
on_stylesheet_saved do |file|
  if File.exists?(file) && File.basename(file) == "style.css"
    puts "Moving: #{file}"
    FileUtils.mv(file, File.dirname(file) + "/../" + File.basename(file))
  end
end