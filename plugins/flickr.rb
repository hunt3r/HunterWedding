# Title: Flickr Set Gallery
# Author: Chris Hunter http://chrishunters.com
# Description: Create client side galleries for flickr
#
# Syntax {% flickr user set float %}
#
# Example:
# {% flickr someuser 89892382989828992 right %}
#

module Jekyll

  class VideoTag < Liquid::Tag

    def initialize(tag_name, config, token)
      super

      @user = config.split[0]
      @set  = config.split[1]
      @float = config.split[2]

    end

    def render(context)
      output = super
      if @video
        video =  "<video width='#{@width}' height='#{@height}' preload='none' controls poster='#{@poster}'>"
        video += "<source src='#{@video}' type='video/mp4; codecs=\"avc1.42E01E, mp4a.40.2\"'/></video>"
      else
        "Error processing input, expected syntax: {% video url/to/video [width height] [url/to/poster] %}"
      end
    end
  end
end

Liquid::Template.register_tag('flickr', Jekyll::FlickrTag)