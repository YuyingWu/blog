<div class="archive">
	{% for item in page.posts %}
		<article class="u-clearfix archive-article {{ item.layout }}">
			<time datetime="{{ item.date.toDate().toISOString() }}">{{ item.date.format(config.date_format) }}</time>
			{% include 'post/title.swig' %}
		</article>
	{% endfor %}

	{% include 'pagination.swig' %}
</div>
