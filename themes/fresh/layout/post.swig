{#
	文章
	/source/_posts/**.md 使用此模板
#}

{% extends '_layout.swig' %}

{% block stylesheet %}
<link rel="stylesheet" href="{{ config.root }}/css/post.css">
{% endblock %}

{% block title %}{{ page.title }} - {{ config.title }}{% endblock %}

{% block bodyClass %}class="page-post"{% endblock %}

{% block primary %}
	{% set pipe = {
		item: page,
		unTitleLink: true,
		className: 'article-post'
	} %}
	{% include '_partial/post-detail/article.swig' with pipe %}
{% endblock %}

{% block afterFooter %}
<script src="http://cdn1.lncld.net/static/js/2.1.4/av-min.js"></script>
<script src="http://apps.bdimg.com/libs/zepto/1.1.4/zepto.min.js"></script>
<script src="http://cdn.bootcss.com/moment.js/2.18.1/moment.min.js"></script>
<script src="{{ config.root }}/build/js/comment.js"></script>
{% endblock %}