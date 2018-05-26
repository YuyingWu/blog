{% if site.categories.length %}
<div class="widget tag category">
	<h3 class="archive-title"><i class="iconfont icon-folder"></i> {{ __('category') }}</h3>
	<ul class="entry">
		{% for category in site.categories.sort('name')%}
		<li><a href="{{ url_for(category.path) }}">{{ category.name }}</a>
			<small>{{ category.posts.length }}</small>
		</li>
		{% endfor %}
	</ul>
</div>
{% endif %}