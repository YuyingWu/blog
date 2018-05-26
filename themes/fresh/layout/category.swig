{# 分类归档 #}

{% extends '_layout.swig' %}

{% block stylesheet %}
<link rel="stylesheet" href="{{ config.root }}/css/archive.css">
{% endblock %}

{% block primary %}

	{% include '_partial/archive.swig' with pipe %}

{% endblock %}