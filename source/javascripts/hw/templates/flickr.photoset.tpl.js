hw.templates.Flickr.PhotoSet = (function() {
	
var tpl = [];

//Gallery Thumbs
tpl.push('<div class="currentPage page" data-page-id="{{page}}">');
tpl.push(	'<ul>');
tpl.push(		'{{#photos}}');
tpl.push(		'<li class="photo">');
tpl.push(			'<div class="photo-inner">');
tpl.push(				'<a class="fancybox-thumb-{{setId}}" title="{{title}}" rel="fancybox" href="{{url_l}}" data-photo-id="{{id}}">');
tpl.push(					'<img src="{{url_sq}}" width="93" height="93" />'); 
tpl.push(				'</a>'); 
tpl.push(			'</div>');
tpl.push(		'</li>');
tpl.push(		'{{/photos}}');
tpl.push(	'</ul>');
tpl.push('</div>');

//PhotoSet Pager
tpl.push('<div class="pager">');
tpl.push(	'{{#pager}}');
tpl.push(		'<span class="page" data-page-id="{{page}}">{{page_label}}</span>');
tpl.push(	'{{/pager}}');
tpl.push('</div>');

return tpl.join("");

})()