hw.models.FlickrPhoto = (function($) {

	function FlickrPhoto(api_key, photo_id) {
		var self = this;
		self.data;
		self.api_key = api_key;
		self.photo_id = photo_id;
		self.init();
	}

	FlickrPhoto.prototype.init = function() {
		var self = this;

		//Get the photos sizes and URLs
		if(self.api_key) {
			var apiCall = "http://api.flickr.com/services/rest/?format=json&method=flickr.photos.getSizes&photo_id="+self.photo_id+"&api_key="+self.api_key+"&jsoncallback=?";
			
			//Get the JSONP data via XHR 
			$.getJSON(apiCall, function(data){
				self.data = data;
				$(self).trigger("photoLoaded");
			});
		}
	};

	FlickrPhoto.prototype.getPhotoSize = function(label) {
		var self = this;
		
		if(self.data && self.data.hasOwnProperty("sizes") && self.data.sizes.hasOwnProperty("size")) {
				
			for(var i=0;i<self.data.sizes.size.length;i++) {
				var asset = self.data.sizes.size[i];
				if(asset.label.toLowerCase() == label.toLowerCase()) {
					return asset;
				}
			}

		}

		return null;

	};

	return FlickrPhoto;
})(jQuery);