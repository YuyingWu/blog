<footer class="wgt-footer" id="footer">
	<div class="center">
		<p>
		&copy; 
		{%if theme.copyright_start %}{{ theme.copyright_start}}-{% endif %}{{ moment(Date.now()).format('YYYY') }}

		{% if config.author %}
			<a href="{{ config.root }}">{{ config.author }}</a>
		{% else %}
			{{ config.title }}
		{% endif %}

		&nbsp;|&nbsp;
		{% include "social.swig" %}
		</p>
		<p>
			{%if theme.footer_info %}{{ theme.footer_info}}&nbsp;{% endif %}
			Powered by 
			<a href="https://hexo.io" target="_blank">Hexo</a>, using theme 
			<a href="https://github.com/YuyingWu/hexo-theme-fresh" 
				target="_blank">Fresh</a>
		.</p>
	</div>
</footer>