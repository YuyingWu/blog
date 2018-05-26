<article class="article {{ item.layout }} {{ className }}">
	<div class="post-content">
		<header>
			{% include 'post/title.swig' with pipe %}
			{% include 'post/meta.swig' %}

			{% if !index && item.layout == 'post' %}
				{% include 'post/category.swig' %}
			{% endif %}
		</header>
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
		{% if !index && item.layout == 'post' %}
			{% include 'post/tag.swig' %}
			{% include 'post/shield.swig' %}
		{% endif %}
	</div>
</article>