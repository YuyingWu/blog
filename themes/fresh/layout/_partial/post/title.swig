{% if index %}
	{% if item.link %}
		{% if item.title %}
			<h3 class="title" data-role="articleTitle"><a href="{{ url_for(item.link) }}" target="_blank">{{ item.title }}</a></h3>
		{% else %}
			<h3 class="title" data-role="articleTitle"><a href="{{ url_for(item.link) }}" target="_blank">{{ item.link }}</a></h3>
		{% endif %}
	{% else %}
		{% if unTitleLink %}
			<h3 class="title" data-role="articleTitle">{{ item.title }}</h3>
		{% else %}
			<h3 class="title" data-role="articleTitle"><a href="{{ url_for(item.path) }}">{{ item.title }}</a></h3>
		{% endif %}
	{% endif %}
{% else %}
	{% if item.link %}
		{% if item.title %}
			<h1 class="title" data-role="articleTitle"><a href="{{ url_for(item.link) }}" target="_blank">{{ item.title }}</a></h1>
		{% else %}
			<h1 class="title" data-role="articleTitle"><a href="{{ url_for(item.link) }}" target="_blank">{{ item.link }}</a></h1>
		{% endif %}
	{% else %}
		{% if unTitleLink %}
			<h1 class="title" data-role="articleTitle">{{ item.title }}</h1>
		{% else %}
			<h1 class="title" data-role="articleTitle"><a href="{{ url_for(item.path) }}">{{ item.title }}</a></h1>
		{% endif %}
	{% endif %}
{% endif %}