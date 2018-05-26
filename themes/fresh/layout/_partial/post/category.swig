{% if item.categories && item.categories.length %}
	<section class="post__meta">
		<i class="iconfont icon-folder"></i>
		<span>{{ __('category') }}：</span>
		{% for category in item.categories %}
			<a href="{{ url_for(category.path ) }}">{{ category.name}}</a>
		{% endfor %}
	</section>
{% endif %}