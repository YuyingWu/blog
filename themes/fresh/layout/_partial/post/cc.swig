<section class="post__widget wgt-post-copyright">
	<p>作者：<a href="{{ config.url }}">{{ config.title }}</a></p>
	<p>标题：{{ item.title }}</p>
	<p>原文地址：{{ config.url }}{{ url_for(item.path) }}</p>
	<p>本作品采用<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议</a>进行许可。</p>
</section>