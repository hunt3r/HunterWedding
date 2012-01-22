/**
 * Flickr.PhotoSet
 * This module maps to the functionality of a Flickr PhotoSet
 */

 //TODO:
 /*
  -- Add animations to paging changes
  -- Add hide/show caching routine to minimize network calls to pages
 */
hw.collections.Flickr.PhotoSets = (function($) {
	function PhotoSets() {
		var self = this;
		self.photosetSelector = '.flickr-photo-set';
		self.photoSets = [];
		$(self.photosetSelector).each(function(index) {
			self.photoSets.push(new hw.modules.Flickr.PhotoSet(this));
		});
		console.log("Flickr PhotoSets Collection Initialized");
	}
	return PhotoSets;
})(jQuery);

hw.modules.Flickr.PhotoSet = (function($) {
	
	function PhotoSet(elem) {
		var self = this;
		self.$elem = $(elem);
		self.actionsBound = false;

		self.model = new hw.models.Flickr.PhotoSet(self.$elem);
		self.view = new self.View(self.model);
	
		$(self.view).bind("viewLoaded"+self.model.setId, function() {
			if(!self.actionsBound) {
				self.bindActions();
			}
		});
		console.log("New Flickr PhotoSet Initialized");
	}
	
	PhotoSet.prototype.bindActions = function() {
		var self = this;
		console.log("bind actions:" + self.model.setId);
		console.log("bindFancybox: " + '.fancybox-thumb-'+self.model.setId);
		$('.fancybox-thumb-'+self.model.setId).fancybox({
			arrows: true,
			maxWidth: 1024,
			openEffect: "none",
			closeEffect: "none",
			nextEffect: "none",
			prevEffect: "none"
		});

		self.$elem.delegate('.page', 'click', function(event) {
			var $pagerElem = $(this);
			var pageId = $pagerElem.data('page-id');
			if(pageId) { self.model.setPage(pageId); }
		});

		self.actionsBound = true;
	};


	PhotoSet.prototype.View = (function() {
		function View(model) {
			var self = this;
			self.model = model;
			$(model).bind("modelLoaded"+self.model.setId, function(){
				console.log("model triggered view " +self.model.setId);
				self.updateGallery();
			});
		}


		View.prototype.updateGallery = function updateGallery() {
			var self = this;
			if(self.model.data && self.model.data.photoset) {

				pager = [];
				for(var i=1; i<=self.model.data.photoset.pages; i++) {
					pager[i-1] = {page: i, page_label: i};
				}

				var viewModel = { "photoset"   : self.model.data.photoset,
								  "photos" : self.model.data.photoset.photo, 
								  "pager"  : pager, 
								  "page"   : self.model.page,
								  "setId"  : self.model.setId };
				
				var template = hw.templates.Flickr.PhotoSet;
				var html = Mustache.to_html(template, viewModel);
				self.model.$elem.html('');
				//Apend to view
				self.model.$elem.append(html);
				$(self).trigger("viewLoaded"+self.model.setId);
			}
		};

		return View;
	})();
	
	return PhotoSet;
})(jQuery);


//Generic photoset model, currently used in 
//Photoset gallery
//Google Map Flickr mashup
hw.models.Flickr.PhotoSet = (function($) {

	function Model($elem) {
		var self = this;
		self.$elem = $elem;
		self.constants = hw.Constants;
		self.user = self.$elem.data('user');
		self.setId = self.$elem.data('set-id').replace("id-", "");
		self.perPage = (self.$elem.data('per-page')) ? self.$elem.data('per-page') : 12;
		self.data;
		self.api_key = self.constants.FLICKR.USERS[self.user] && self.constants.FLICKR.USERS[self.user].APIKEY;
		self.page = 1;
		self.getData();
	}

	Model.prototype.setPage = function(page) {
		var self = this;
		self.page = page;
		console.log("new Page",self.page);
		self.getData();
	};

	Model.prototype.getData = function() {
		var self = this;
		
		if(self.api_key) {
			var apiCall = "http://api.flickr.com/services/rest/?format=json&extras=geo,url_sq,url_t,url_s,url_m,url_l&\
							method=flickr.photosets.getPhotos&photoset_id="+self.setId+"\
							&per_page="+self.perPage+"&page="+self.page+"&api_key="+self.api_key+"&jsoncallback=?";

			//Get the JSONP data via XHR 
			$.getJSON(apiCall, function(data){
				self.data = data;
				console.log(data);
				$(self).trigger("modelLoaded"+self.setId);
			});
		}
	};


	return Model;
})(jQuery);

