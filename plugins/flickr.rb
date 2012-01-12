# Title: Flickr Set Gallery
# Author: Chris Hunter http://chrishunters.com
# Description: Create client side galleries for flickr
#
# Syntax {% flickr set user float %}
#
# Example:
# {% flickr 89892382989828992 youruser right %}
#

module Jekyll

  class VideoTag < Liquid::Tag
    @set_id = ''
    @user = ''
    @float = ''

    def initialize(tag_name, markup, tokens)

      super
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