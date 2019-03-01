var Zoom = require('zoom');

$(document).on('click', 'img', function(){
	const self = $(this);

	const OFFSET = 40;

	const WINDOW = $(window);
	const WIN_WIDTH = WINDOW.width();
	const WIN_HEIGHT = WINDOW.height();


	/*const imgElement = new Image();
	imgElement.src = self.attr('src');*/
	const NATURAL_WIDTH = this.naturalWidth;
	const NATURAL_HEIGHT = this.naturalHeight;

	let newWidth = Math.min(WIN_WIDTH, NATURAL_WIDTH);
	let newHeight = Math.min(WIN_HEIGHT, NATURAL_HEIGHT);

	$('body').css({
		width: WIN_WIDTH,
		height: WIN_HEIGHT,
		overflow: 'hidden'
	});

	self.css({
		position: 'absolute',
		top: (WIN_HEIGHT - newHeight) / 2 + 'px',
		left: (WIN_WIDTH - newWidth) / 2 + 'px',
		width: WIN_WIDTH + 'px'
		//height: newHeight + 'px'
	});
});

