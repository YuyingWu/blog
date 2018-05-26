const checkScrollPos = () => {
  const tocElement = document.querySelector('.wgt-toc');
  // const bodyScrollTop = document.body.getBoundingClientRect().top;
  const postElement = document.querySelector('.post-content');
  const postScrollTop = postElement.getBoundingClientRect().top;
  const postRight = postElement.getBoundingClientRect().right;
  const postWidth = postElement.getBoundingClientRect().width;
  const gutter = 20;
  const tocWidth = 250;
  const absLeft = (postWidth + gutter) + 'px';
  const fixedLeft = (postRight + gutter) + 'px';
  tocElement.style.left = absLeft;

  if( postScrollTop >= 0 ) {
    tocElement.style.position = 'absolute';
    tocElement.style.left = absLeft;
    tocElement.style.top = '76px';
  } else {
    tocElement.style.position = 'fixed';
    tocElement.style.top = '0';
    tocElement.style.left = fixedLeft;
  }
}

export default checkScrollPos;