# Title: Flickr/Google Map Photo Gallery
# Author: Chris Hunter http://chrishunters.com
# Description: Client side google map / flickr photoset mashup
#
# Syntax {% flickrmap user set float width %}

require './plugins/raw'
module Jekyll

  class FlickrMapTag < Liquid::Tag
    include TemplateWrapper
    def initialize(tag_name, config, token)
      super

      @user  = config.split[0]
      @set   = config.split[1]
      @per_page = 1000
      @float = config.split[2]
      @containerWidth = config.split[3] || "750px"
      @containerHeight =  config.split[4] || "450px"
    end

    def render(context)
      output = super
      template = <<-EOF
      <div class="flickr-map-photo-set-wrap">
        <div style="min-width:#{@containerWidth}; max-width:893px; height:#{@containerHeight}" 
              data-module="flickr-set" 
              data-set-id="id-#{@set}" 
              data-per-page="#{@per_page}" 
              id="flickrmap-#{@set}" data-user="#{@user}" 
              class="flickr-map-photo-set flickr-gallery-#{@float}">
          <!-- Built client-side see: flickr PhotoSet module/template-->
        </div>
      </div>
      EOF
      safe_wrap(template)
    end
  end
end

Liquid::Template.register_tag('flickrmap', Jekyll::FlickrMapTag)