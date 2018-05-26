import CheckTocScroll from './post/checkTocScroll';
const BREAK_POINT = 1200;
const WINDOW_WIDTH = window.innerWidth;

if(document.querySelector('.wgt-toc')){
  const tocElement = document.querySelector('.wgt-toc');

  // 滚动
  if((WINDOW_WIDTH >= BREAK_POINT)){
    CheckTocScroll();
    window.addEventListener('scroll', CheckTocScroll);
    window.addEventListener('resize', CheckTocScroll);
  }

  // 点击
  tocElement.addEventListener('click', () => {
    const currentStatus = tocElement.style.getPropertyValue('--toc-display');

    if(currentStatus === 'block') {
      tocElement.style.setProperty('--toc-display', 'none');
    } else {
      tocElement.style.setProperty('--toc-display', 'block');
    }
  });
}
