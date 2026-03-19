(function () {
  var b = document.documentElement.dataset.browser;
  if (b !== 'safari' && b !== 'chrome' && b !== 'firefox') return;

  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'styles.' + b + '.css?v=20260318f';
  document.head.appendChild(link);

  var isMobile =
    window.matchMedia('(hover: none) and (pointer: coarse)').matches || window.innerWidth <= 768;
  if (!isMobile || (b !== 'safari' && b !== 'chrome')) return;

  var mobileLink = document.createElement('link');
  mobileLink.rel = 'stylesheet';
  mobileLink.href = 'styles.' + b + '.mobile.css?v=20260318c';
  document.head.appendChild(mobileLink);
})();
