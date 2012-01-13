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
			$.when(model.getData())
			   .then(function(){
			      console.log( 'I fire after ajax' );
			      var view = new self.View($elem, model);
			   })
			   .fail(function(){
			      console.log( 'I fire if one or more requests failed.' );
			   });
			

			self.galleries.push({"view": view, "model":model});

		});
	};

	Flickr.prototype.View = (function() {
		function View($elem, model) {
			var self = this;
			self.model=model;
			self.$elem=$elem;


		}

		View.prototype.updateGallery = function updateGallery() {
			$.each(data.photoset.photo, function(i,photo){
				var src = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_" + "s.jpg";
				var a_href = "http://www.flickr.com/photos/" + data.photoset.owner + "/" + photo.id + "/";
				model = {
					"link" : a_href,
					"img" : { "src" : src }
					};
				console.log(model);
				//var html = Mustache.to_html(template, person);

				//PLACE IMAGE IN IMAGE TAG AND APPEND TO IMAGES DIV 
				//$("<img/>").attr("src", img_src).appendTo("#content");

				// //WRAP IN LINK
				// .wrap(("<a href='" + a_href + "'></a>"));
			});

		};
	})();

	Flickr.prototype.Model = (function() {
		function Model(user, setId) {
			var self = this;
			self.constants = hw.Constants;
			self.data;
			self.user = user;
			self.setId = setId;
		}

		Model.prototype.getData = function() {
			var self = this;
			var apikey = self.constants.FLICKR.USERS[user] && self.constants.FLICKR.USERS[self.user].APIKEY;
			
			if(apikey) {
				var apiCall = "http://api.flickr.com/services/rest/?format=json&method=flickr.photosets.getPhotos&photoset_id="+self.setId+"&per_page=10&page=1&api_key="+apikey+"&jsoncallback=?";
				
				//Get the JSONP data via XHR 
				$.getJSON(apiCall, function(data){
					var self = this;
					self.data = data;
				});
			}
		}

		return Model;
	})();

	return Flickr;
})(jQuery);