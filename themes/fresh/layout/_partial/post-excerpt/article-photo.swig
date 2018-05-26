{# 
	tempate: title + meta
	front-matter:
		title:
		type: photo // !required
		cover: image url
 #}
<a href="{{ url_for(item.path) }}" class="articlePhoto__cover">
	<img src="{{ item.cover }}" alt="" class="articlePhoto__cover" />
	<div class="articlePhoto__modal"></div>
	<div class="articlePhoto__content">
		{% include "../post/title.swig" with { unTitleLink: true } %}

		<div class="articlePhoto__excerpt">{{ item.excerpt }}</div>

		{% include "../post/meta.swig"%}
	</div>
</a>