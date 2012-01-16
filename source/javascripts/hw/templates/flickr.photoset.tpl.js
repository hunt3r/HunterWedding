hw.templates.FlickrPhotoset = (function() {
	
var tpl = [];

tpl.push('<ul>');
tpl.push('{{#photos}}');
tpl.push('<li class="photo">');
tpl.push(	'<div class="photo-inner">');
tpl.push(		'<a class="fancybox-thumb" title="{{photo.title}}" rel="fancybox" href="{{photo.url_l}}" data-photo-id="{{photo.id}}">');
tpl.push(			'<img src="{{img.src}}" width="93" height="93" />'); 
tpl.push(		'</a>');
tpl.push(	'</div>');
tpl.push('</li>');
tpl.push('{{/photos}}');
tpl.push('</ul>');

return tpl.join("");
})()