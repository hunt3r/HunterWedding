hw.templates.FlickrPhotoset = (function() {
	
var tpl = [];

tpl.push('<ul>');
tpl.push('{{#photos}}');
tpl.push('<li class="photo">');
tpl.push(	'<div class="photo-inner">');
tpl.push(		'<a href="{{a.href}}">');
tpl.push(			'<img src="{{img.src}}" />');
tpl.push(		'</a>');
tpl.push(	'</div>')
tpl.push(	'<div class="social"></div>')
tpl.push('</li>')
tpl.push('{{/photos}}');
tpl.push('</ul>');

return tpl.join("");
})()