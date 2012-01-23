/**
 * Flickr.PhotoSet
 * This module maps to the functionality of a Flickr PhotoSet
 */

 //TODO:
 /*
  -- Add animations to paging changes
  -- Add hide/show caching routine to minimize network calls to pages
 */
hw.collections.Flickr.GoogleMapPhotoSets = (function($) {
	function GoogleMapPhotoSets() {
		var self = this;
		
		self.photosetSelector = '.flickr-map-photo-set';
		self.googlePhotoSets = [];
		$(self.photosetSelector).each(function(index) {
			self.googlePhotoSets.push(new hw.modules.Flickr.GoogleMapPhotoSet(this));
		});

		console.log("Flickr Google Map PhotoSets Collection Initialized");
	}
	return GoogleMapPhotoSets;
})(jQuery);

hw.modules.Flickr.GoogleMapPhotoSet = (function($) {
	
	function GoogleMapPhotoSet(elem) {
		var self = this;
		self.$elem = $(elem);
		self.actionsBound = false;

		self.photoSelectorParent = '.flickr-map-photo-set-wrap';

		self.model = new hw.models.Flickr.PhotoSet(self.$elem);
		self.model.$parent = $(self.photoSelectorParent);
		self.view = new self.View(self.model);
	
		$(self.view).bind("viewLoaded"+self.model.setId, function() {
			//Do something after the view loads...
		});

		console.log("New Flickr GoogleMapPhotoSet Initialized");
	}


	GoogleMapPhotoSet.prototype.View = (function() {
		function View(model) {
			var self = this;
			self.model = model;
			$(self.model).bind("modelLoaded"+self.model.setId, function(){
				console.log("model triggered view " +self.model.setId);
				self.updateMap();
			});
		}

		View.prototype.updateMap = function updateMap(LAT, LNG) {
			var self = this;
					
			var pos = {lat: (LAT)?LAT:self.model.constants.GOOGLE.MAPS.DEFAULTS.LAT,
					   lng: (LNG)?LNG:self.model.constants.GOOGLE.MAPS.DEFAULTS.LNG};

			self.mapOptions = {
				center: new google.maps.LatLng(pos.lat,pos.lng),
				zoom: self.model.constants.GOOGLE.MAPS.DEFAULTS.ZOOM,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			self.map = new google.maps.Map(
				document.getElementById(self.model.$elem.attr("id")),
				self.mapOptions);

			//If we have a map object, add stuff to it
			if(self.map) {
				self.addPhotos();
				self.addCarousel();
				self.bindEvents();
			}
		};

		View.prototype.addPhotos = function addPhotos() {
			var self = this;
			self.photoMarkers = [];

			if (self.model.data.photoset && self.model.data.photoset.photo) {
				for(var i=0; i<self.model.data.photoset.photo.length; i++) {
					var photo = self.model.data.photoset.photo[i];
					if(photo.latitude && photo.longitude) {
						//console.log("has geo: ", photo);

						var photoLatLng = new google.maps.LatLng(photo.latitude, 
																 photo.longitude);

						//Create the info window HTML via Mustache
						var infoWindowModel = {"photo": photo};
						var html = Mustache.to_html(hw.templates.Flickr.PhotoSetGalleryOverlay , infoWindowModel);

						//Create the marker
						var marker = new google.maps.Marker({
							position: photoLatLng,
							map: self.map,
							title: (photo.title) ? photo.title : photo.id
						});

						marker.html = html;
						
						var photoObj = { "marker": marker,
										 "photo" : photo };

						
						self.photoMarkers.push(photoObj);

					}
				}

				//Center the map after we add the markers
				self.autoCenter();
			}
		};


		View.prototype.addCarousel = function addCarousel() {
			var self = this;

			self.photos = [];
			$.each(self.photoMarkers, function(index, obj) {
				if(obj.photo) {
					obj.photo.index = index;
					self.photos.push(obj.photo);
				}
			});

			var carouselId = "photoset-carousel-"+self.model.setId;
			var viewModel = { "photos" : self.photos,
							  "carouselId"  : carouselId };
			var html = Mustache.to_html(hw.templates.Flickr.PhotoSetCarousel, viewModel);
			self.model.$elem.after(html);
			

			var $wrap = $('.carousel-wrap');
			
			$(function() {
				$("."+carouselId).jCarouselLite({
					btnNext: ".next",
					btnPrev: ".prev",
					visible: 11
				});
			});
			
			
		};

		View.prototype.autoCenter = function autoCenter() {
			var self = this;
			
			var bounds = new google.maps.LatLngBounds();

			$.each(self.photoMarkers, function (index, obj) {
				bounds.extend(obj.marker.position);
			});

			self.map.fitBounds(bounds);
		};

		View.prototype.bindEvents = function() {
			var self = this;
			
			//Create the global infowindow object
			self.infoWindow = new google.maps.InfoWindow({
				content: "Loading..."
			});

			$.each(self.photoMarkers, function (index, obj) {
				
				google.maps.event.addListener(obj.marker, 'click', function() {
					self.infoWindow.setContent(this.html);
					self.infoWindow.open(self.map, this);
				});


			});

			$('.fancybox-thumb').fancybox({
				arrows: true,
				maxWidth: 1024,
				openEffect: "none",
				closeEffect: "none",
				nextEffect: "none",
				prevEffect: "none"
			});

			self.model.$parent.delegate("a.carousel-thumb", "mouseover click", function(event) {
				var $elem = $(this);
				var markerIndex = $elem.data("marker-index");
				self.map.setZoom(10);
				google.maps.event.trigger(self.photoMarkers[markerIndex].marker, "click");
				return false;
			});

			self.model.$parent.delegate(".flickr-map-carousel", "mouseout", function(event) {
				self.infoWindow.close();
				self.autoCenter();
				return false;
			});

		};
		return View;
	})();

	return GoogleMapPhotoSet;
})(jQuery);
