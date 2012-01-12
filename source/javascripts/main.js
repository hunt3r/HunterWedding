hw.Constants = {
	FLICKR : {
		APIKEY : "c0b4855caf10787f53e5e94d1dc8d1cd"
	}
}


hw.Main = (function() {
	function Main() {
		var self = this;
		self.flickrGalleries = new hw.modules.Flickr();
	}
	return Main;
})();


//Start the app on document ready.
$(document).ready(function(){
	var self = this;
	self.hwApp = new hw.Main();
});