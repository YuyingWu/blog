{# 首页 #}

{% extends '_layout.swig' %}

{% block bodyClass %}class="page-index"{% endblock %}

{% block stylesheet %}
<link rel="stylesheet" href="{{ config.root }}/css/index.css">
{% endblock %}

{% block primary %}
	<section class="u-maxWidth640 u-marginAuto">
		{% for post in page.posts %}
			{% set pipe = {
				item: post,
				index: true,
				className: "post-index"
			} %}

			{% include '_partial/post-excerpt/article.swig' with pipe %}
		{% endfor %}

		{% include '_partial/pagination.swig' %}
	</section>
{% endblock %}