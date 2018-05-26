{#
	草稿
	/source/_drafts/**.md 使用此模板
#}

{% extends '_layout.swig' %}

{% block primary %}

	{% set pipe = {item: page, unTitleLink: true} %}
	{% include '_partial/post-detail/article.swig' with pipe %}

{% endblock %}