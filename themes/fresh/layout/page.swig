{#
	分页
	/source/**.md 文章使用此模板
#}

{% extends '_layout.swig' %}

{% block bodyClass %}class="page-page"{% endblock %}

{% block stylesheet %}
<link rel="stylesheet" href="{{ config.root }}/css/post.css">
{% endblock %}

{% block title %}{{ page.title }} - {{ config.title }}{% endblock %}

{% block primary %}

	{% set pipe = {item: page, unTitleLink: true} %}
	{% include '_partial/post-detail/article.swig' with pipe %}

{% endblock %}
