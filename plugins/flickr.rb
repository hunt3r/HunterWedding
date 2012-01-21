# Title: Flickr Set Gallery
# Author: Chris Hunter http://chrishunters.com
# Description: Create client side galleries for flickr
#
# Syntax {% flickr user set float %}
#
# Example:
# {% flickr someuser 89892382989828992 right %}
#
require './plugins/raw'
module Jekyll

  class FlickrTag < Liquid::Tag
    include TemplateWrapper
    def initialize(tag_name, config, token)
      super

      @user  = config.split[0]
      @set   = config.split[1]
      @per_page = config.split[2] || "12"
      @float = config.split[3]
      @containerWidth = config.split[4] || "auto"

    end

    def render(context)
      output = super
      template = <<-EOF
      <div style="width:#{@containerWidth}px" 
            data-module="flickr-set" 
            data-set-id="id-#{@set}" 
            data-per-page="#{@per_page}" 
            id="#{@set}" data-user="#{@user}" 
            class="flickr-photo-set flickr-gallery flickr-gallery-#{@float}">
        <!-- Built client-side see: flickr PhotoSet module/template-->
      </div>
      EOF
      safe_wrap(template)
    end
  end
end

Liquid::Template.register_tag('flickr', Jekyll::FlickrTag)