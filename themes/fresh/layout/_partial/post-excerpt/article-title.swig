{# 
	tempate: title + meta
	front-matter:
		title:
		type: title // !required
 #}
<header>
	{% include '../post/title.swig' with pipe %}
	{% include '../post/meta.swig' %}
</header>