<div class="post__meta">
	<time datetime="{{ item.date.toDate().toISOString() }}">{{ item.date.format(config.date_format) }}</time>

	{% if item.readTime %}
	<span class="reading-time">, {{ item.readTime }} read</span>
	{% endif %}
</div>