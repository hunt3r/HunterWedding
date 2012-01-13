hw.modules.Flickr = (function($) {
	
	function Flickr() {
		var self = this;
		console.log("Flickr module init.");
		self.init();
	}

	Flickr.prototype.init = function() {
		var self = this;
		self.galleries = [];
		$('.flickr-set').each(function(index) {
			var $elem = $(this);
			var user = $elem.data('user');
			var set_id = $elem.data('set-id').replace("id-", "");

			console.log("Found gallery set for user: " + user );
			var model = new self.Model(user, set_id);
			var view = new self.View($elem, model);

			self.galleries.push({"view": view, "model":model});

		});
	};

	Flickr.prototype.View = (function() {
		function View($elem, model) {
			var self = this;
			self.model=model;
			self.$elem=$elem;
			$(model).bind("flickrLoaded", function(){
				self.updateGallery();
			});
		}

		View.prototype.updateGallery = function updateGallery() {
			var self = this;
			if(self.model.data && self.model.data.photoset) {
				console.log(self.model.data);
				// Make sure we have a photo set
				var photos = [];
				$.each(self.model.data.photoset.photo, function(i,photo){
					var src = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_" + "s.jpg";
					var href = "http://www.flickr.com/photos/" + self.model.data.photoset.owner + "/" + photo.id + "/";
					
					var photo = {
						"a"   : { "href" : href},
						"img" : { "src"  : src }
					};
					photos.push(photo);
				});

				model = {"photos" : photos};
				console.log(model);
				var template = hw.templates.FlickrPhotoset;
				var html = Mustache.to_html(template, model);

				//Apend to view
				self.$elem.append(html);
			}
		};

		return View;
	})();

	Flickr.prototype.Model = (function() {
		function Model(user, setId) {
			var self = this;
			self.constants = hw.Constants;
			self.data;
			self.user = user;
			self.setId = setId;
			self.getData();
		}

		Model.prototype.getData = function() {
			var self = this;
			var apikey = self.constants.FLICKR.USERS[self.user] && self.constants.FLICKR.USERS[self.user].APIKEY;
			
			if(apikey) {
				var apiCall = "http://api.flickr.com/services/rest/?format=json&method=flickr.photosets.getPhotos&photoset_id="+self.setId+"&per_page=10&page=1&api_key="+apikey+"&jsoncallback=?";
				
				//Get the JSONP data via XHR 
				$.getJSON(apiCall, function(data){
					self.data = data;
					$(self).trigger("flickrLoaded");
				});
			}
		}

		return Model;
	})();

	return Flickr;
})(jQuery);