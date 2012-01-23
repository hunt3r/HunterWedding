hw.templates.Flickr.PhotoSetCarousel = (function() {
	
var tpl = [];

tpl.push('<div class="carousel-wrap">');
tpl.push('<div class="prev"><</div>');
tpl.push('<div class="carousel flickr-map-carousel {{carouselId}}">');
tpl.push(		'<ul>');
tpl.push(			'{{#photos}}');
tpl.push(			'<li class="photo">');
tpl.push(				'<div class="photo-inner">');
tpl.push(					'<a class="carousel-thumb" title="{{title}}" href="#" data-marker-index="{{index}}">');
tpl.push(						'<img src="{{url_sq}}" width="93" height="93" />'); 
tpl.push(					'</a>'); 
tpl.push(				'</div>');
tpl.push(			'</li>');
tpl.push(			'{{/photos}}');
tpl.push(		'</ul>');
tpl.push(	'</div>');
tpl.push(	'<div class="next">></div>');
tpl.push('</div>');

return tpl.join("");

})()