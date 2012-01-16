hw.modules.Flickr = (function($) {
	
	function Flickr() {
		var self = this;
		console.log("Flickr module init.");
		self.init();
	}

	Flickr.prototype.init = function() {
		var self = this;
		self.galleries = [];
		self.actionsBound = false;

		$('.flickr-set').each(function(index) {
			var $elem = $(this);
			var user = $elem.data('user');
			var set_id = $elem.data('set-id').replace("id-", "");

			var model = new self.Model(user, set_id);
			var view = new self.View($elem, model);

			self.galleries.push({"view": view, "model":model});

			if(!self.actionsBound) {
				$(view).bind("viewLoaded", function() {
					self.bindActions();
					self.actionsBound = true;
				});
			}
		});
	};
	
	Flickr.prototype.bindActions = function() {
		var self = this;

		$('.fancybox-thumb').fancybox({
			arrows: true,
			maxWidth: 880,
			openEffect: "none",
			closeEffect: "none",
			nextEffect: "none",
			prevEffect: "none"
		});

		// $(".flickr-set").delegate("a", "click", function(event) {
		// 	var $thmb = $(this);
		// 	var photo_id = $thmb.data("photo-id");
		// 	var api_key = "c0b4855caf10787f53e5e94d1dc8d1cd";
		// 	if(photo_id) {
		// 		var photo = new hw.models.FlickrPhoto(api_key, photo_id);

		// 		$(photo).bind("photoLoaded", function() {
		// 			var photoAsset = photo.getPhotoSize("Large");
				
		// 			if(photoAsset.source) {
		// 				$.fancybox.open({ 
		// 					href: photoAsset.source,
		// 					arrows: true
		// 				});
		// 			}
		// 		});
		// 	}

		// 	return false;
		// });
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
				$.each(self.model.data.photoset.photo, function(i, photo){
					var src = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_" + "s.jpg";
					var href = "http://www.flickr.com/photos/" + self.model.data.photoset.owner + "/" + photo.id + "/";
					
					var _photo = { "photo" : photo, "a"  : { "href" : href}, "img" : { "src"  : src } };
					photos.push(_photo);
				});

				model = {"photos" : photos};
				
				var template = hw.templates.FlickrPhotoset;
				var html = Mustache.to_html(template, model);

				//Apend to view
				self.$elem.append(html);
				$(self).trigger("viewLoaded");
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
			self.api_key = self.constants.FLICKR.USERS[self.user] && self.constants.FLICKR.USERS[self.user].APIKEY;

			self.getData();
		}

		Model.prototype.getData = function() {
			var self = this;
			
			if(self.api_key) {
				var apiCall = "http://api.flickr.com/services/rest/?format=json&extras=url_sq,url_t,url_s,url_m,url_l&method=flickr.photosets.getPhotos&photoset_id="+self.setId+"&per_page=10&page=1&api_key="+self.api_key+"&jsoncallback=?";
				
				//Get the JSONP data via XHR 
				$.getJSON(apiCall, function(data){
					self.data = data;
					console.log(data);
					$(self).trigger("flickrLoaded");
				});
			}
		};

		return Model;
	})();

	return Flickr;
})(jQuery);


	