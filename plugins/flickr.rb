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

  class FlickrTag < Liquid::Tag

    def initialize(tag_name, config, token)
      super

      @user = config.split[0]
      @set  = config.split[1]
      @float = config.split[2]

    end

    def render(context)
      output = super
      <<-EOF
      <p data-set-id="#{@set}" data-user="#{@user}" class="gallery-#{@float}">
        <!-- Built client-side -->
      </p>
      EOF
    end
  end
end

Liquid::Template.register_tag('flickr', Jekyll::FlickrTag)