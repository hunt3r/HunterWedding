hw.modules.Flickr = (function($) {
	
	function Flickr() {
		var self = this;
		console.log("Flickr module init.");
		self.model = new self.Model("72157626968174886");

	}

	Flickr.prototype.View = (function() {
		function View(container, data) {
			var self = this;
		}

		View.prototype.updateGallery = function updateGallery() {
			//LOOP THROUGH DATA

		}
	})();

	Flickr.prototype.Model = (function(id) {
		function Model() {
			var self = this;
			self.constants = hw.Constants;
			self.photos;
			console.log("New flickr model");
			self.getData(id);
		}

		Model.prototype.getData = function(id) {
			var self = this;
			var apiCall = "http://api.flickr.com/services/rest/?format=json&method=flickr.photosets.getPhotos&photoset_id="+id+"&per_page=10&page=1&api_key="+self.constants.FLICKR.APIKEY+"&jsoncallback=?";
			//SEND API CALL AND RETURN RESULTS TO A FUNCTION    
			$.getJSON(apiCall, function(data){

			    $.each(data.photoset.photo, function(i,photo){
					//LINK TO IMAGE SOURCE
					var img_src = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_" + "s.jpg";

					//LINK TO IMAGE PAGE (REQUIRED BY FLICKR TOS)
					var a_href = "http://www.flickr.com/photos/" + data.photoset.owner + "/" + photo.id + "/";

					//PLACE IMAGE IN IMAGE TAG AND APPEND TO IMAGES DIV 
					$("<img/>").attr("src", img_src).appendTo("#content");

					// //WRAP IN LINK
					// .wrap(("<a href='" + a_href + "'></a>"));
				});

			});
		};
		return Model;
	})();

	return Flickr;
})(jQuery);