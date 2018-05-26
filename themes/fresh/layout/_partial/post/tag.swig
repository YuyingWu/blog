{% if item.tags && item.tags.length %}
	<section class="post__meta post__tag">
		{% for tag in item.tags %}
			<a href="{{ url_for(tag.path ) }}">{{ tag.name}}</a>
		{% endfor %}
	</section>
{% endif %}