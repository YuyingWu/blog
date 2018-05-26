{# root 模板 #}

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8"/>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="renderer" content="webkit">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="description" content="{{ config.description }}">

	{% block stylesheet %}
	<link rel="stylesheet" href="{{ config.root }}/build/css/pages/post{% include '_common/timestamp.swig' %}.css">
	{% endblock %}

	<title>{% block title %}{{ config.title }} - {{ config.subtitle }}{% endblock %}</title>

	<!--[if lte IE 8]>
        <script>
            (function(){
                var e="abbr,article,aside,audio,canvas,datalist,details,dialog,eventsource,figure,footer,header,hgroup,mark,menu,meter,nav,output,progress,section,time,video".split(","),
                i=e.length;
                while(i--){document.createElement(e[i])}
             })();
        </script>
    <![endif]-->
</head>
<body {% block bodyClass %}{% endblock %}>
{% if theme.ga %}
{% include '_widget/google-analytics.swig' %}
{% endif %}

{% include '_widget/old-browser.swig' %}

{% block header %}
	{% include '_partial/header.swig' %}
{% endblock %}

<div id="content">
	<div class="center">
		<div class="main-col">
			{% block primary %}{% endblock %}
		</div>
		{% block extendElement %}{% endblock %}
	</div>
</div>

<link rel="stylesheet" href="{{ config.root }}/build/css/iconfont_201704181501.css">

{% block footer %}
	{% include '_partial/footer.swig' %}
{% endblock %}

{% block afterFooter %}{% endblock %}

<script src="//sinacloud.net/woodysblog/statics/lazyload.js"></script>
<script>
	new LazyLoad({
		threshold: 600
	});
</script>
<script src="{{ config.root }}/dist/base.js"></script>
</body>
</html>