{% if item.type %}
	{% set typeClass = 'article-type-' + item.type | default('') %}
{% endif %}

<article class="article article-excerpt {{ typeClass }} {{ item.layout }} {{ className }}">
	<div class="post-content">
		{%if item.type == 'title' %}
			{% include 'article-title.swig' with pipe %}
		{% elseif item.type == 'photo' %}
			{% include 'article-photo.swig' with pipe %}
		{% else %}
			{% include 'article-normal.swig' with pipe %}
		{% endif %}
	</div>
</article>