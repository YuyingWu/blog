<div class="entry">
	{% if item.excerpt && index %}
		{{ item.excerpt }}

		<footer class="u-clearfix">
			<a href="{{ url_for(item.path) }}#more" class="excerpt--more">{{ theme.excerpt_link }}</a>
		</footer>
	{% else %}
		{{ item.content }}
	{% endif %}
</div>