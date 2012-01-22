hw.Constants = {
	FLICKR : {
		USERS : {
			"motoprog" : {
				APIKEY : "c0b4855caf10787f53e5e94d1dc8d1cd"
			}
		}
	},
	GOOGLE : {
		MAPS : {
			APIKEY : "AIzaSyAz9cOpE0Ar67QDRhQkTgRk6IqavXHS4Yo",
			DEFAULTS : {
				LAT  : 40.0532987,
				LNG  : -75.23040379999998,
				ZOOM : 2,

			}
		}
	}
}


hw.Main = (function() {
	function Main() {
		var self = this;
		self.flickrGalleries = new hw.collections.Flickr.PhotoSets();
		self.flickrMapsGalleries = new hw.collections.Flickr.GoogleMapPhotoSets();
	}
	return Main;
})();


//Start the app on document ready.
$(document).ready(function(){
	var self = this;
	self.hwApp = new hw.Main();
});