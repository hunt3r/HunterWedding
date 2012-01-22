hw.templates.Flickr.PhotoSetGalleryOverlay = (function() {
	
var tpl = [];

//Gallery Thumbs
tpl.push('<div class="overlay" data-page-id="{{page}}">');
tpl.push(	'{{#photo}}');
tpl.push(		'<a class="fancybox-thumb" title="{{title}}" rel="fancybox" href="{{url_l}}" data-photo-id="{{id}}">');
tpl.push(			'<img src="{{url_s}}" height="250" />');
tpl.push(		'</a>');
tpl.push(	'	<p class="photo-title">{{title}}</p>')
tpl.push(	'{{/photo}}');
tpl.push('</div>');

return tpl.join("");

})()