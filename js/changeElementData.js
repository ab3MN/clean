const changeElementText = (el, text = '') =>
  el
    ? el.innerText === text
    : console.error('Change element text with some error');
