<header{% if className %} class="{{ className }}"{% endif %}>
	<section class="u-clearfix header__container">
		<nav class="grid-r header__nav--list">
			{% for menu in theme.menu %}
				<a href="{{ menu }}">{{ __(loop.key) }}</a>
			{% endfor %}
		</nav>

		<h1 class="grid">
			<a href="{{ config.homepage }}">{{ config.title }}</a>
		</h1>
	</section>
</header><!-- /header -->