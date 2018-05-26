<section id="wgt-comment" class="wgt-comment" data-permalink="/{{ item.path }}">
	<div id="comment-list">
		<article>暂无数据</article>
	</div>

	<form id="comment-form" class="comment__form">
		<input type="text" 
			name="author" 
			class="comment--mb10 comment__contentAuthor" 
			required 
			max-length="15"
			placeholder="这里输入你的名字" />
		<input type="text" 
			name="content" 
			class="comment--mb10 comment__contentInput" 
			required
			max-length="150"
			placeholder="这里输入评论内容" />
		<input type="hidden" name="parentId" id="comment-reply-id" />
		<!-- <label>
			<span>Email: </span>
			<input type="email" name="email">
		</label>
		<label>
			<span>website: </span>
			<input type="url" name="website">
		</label> -->

		<footer class="comment--clearfix comment--tRight" id="comment-form-footer">
			<a id="comment-box-submit" class="comment--fontsizeMeta comment--colorAccent comment__submitReply">加上去</a>
		</footer>
	</form>
</section>