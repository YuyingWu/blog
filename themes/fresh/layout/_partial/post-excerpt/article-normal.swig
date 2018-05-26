{# 
	tempate: title + meta + excerpt content [ default ]
 #}
<header>
	{% include '../post/title.swig' with pipe %}
	{% include '../post/meta.swig' %}
</header>
<div class="entry">
	{{ item.excerpt }}

	<footer class="u-clearfix">
		<a href="{{ url_for(item.path) }}#more" class="excerpt--more">{{ theme.excerpt_link }}</a>
	</footer>
</div>