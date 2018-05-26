{% if site.tags.length %}
<div class="widget tag">
	<h3 class="archive-title"><i class="iconfont icon-tag"></i> {{ __('tag') }}</h3>
	<ul class="entry">
		{% for tag in site.tags.sort('name') %}
		<li><a href="{{ url_for(tag.path) }}">#{{ tag.name }}</a>
			<small>{{ tag.posts.length }}</small>
		</li>
		{% endfor %}
	</ul>
</div>
{% endif %}