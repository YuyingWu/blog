<nav class="pagination">
	{% if page.prev %}
		<a href="{{ url_for(page.prev_link) }}" class="prev"><i class="iconfont icon-left"></i> {{ __('prev') }}</a>
	{% endif %}
	{% if page.next %}
		<a href="{{ url_for(page.next_link) }}" class="next">{{ __('next') }} <i class="iconfont icon-right"></i></a>
	{% endif %}
</nav>