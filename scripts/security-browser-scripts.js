(function () {
  var b = document.documentElement.dataset.browser;
  if (b !== 'safari' && b !== 'chrome' && b !== 'firefox') return;

  var script = document.createElement('script');
  script.src = 'script.' + b + '.js?v=20260318f';
  document.body.appendChild(script);

  var isMobile =
    window.matchMedia('(hover: none) and (pointer: coarse)').matches || window.innerWidth <= 768;
  if (!isMobile || (b !== 'safari' && b !== 'chrome')) return;

  var mobileScript = document.createElement('script');
  mobileScript.src = 'script.' + b + '.mobile.js?v=20260318f';
  document.body.appendChild(mobileScript);
})();
