(function () {
  var ua = navigator.userAgent;
  var isFirefox = /Firefox\//.test(ua);
  var isSafari =
    /Safari\//.test(ua) &&
    !/Chrome\//.test(ua) &&
    !/Chromium\//.test(ua) &&
    !/Edg\//.test(ua) &&
    !/OPR\//.test(ua);
  var isChrome = /Chrome\//.test(ua) && !/Edg\//.test(ua) && !/OPR\//.test(ua);
  var browser = isSafari ? 'safari' : isFirefox ? 'firefox' : isChrome ? 'chrome' : 'other';
  var root = document.documentElement;

  root.dataset.browser = browser;
  root.classList.add('is-' + browser);

  if (sessionStorage.getItem('playerIntroSeen')) root.classList.add('skip-player-intro');
  else sessionStorage.setItem('playerIntroSeen', '1');

  if (sessionStorage.getItem('navIntroSeen')) root.classList.add('skip-nav-intro');
  else sessionStorage.setItem('navIntroSeen', '1');

  if (sessionStorage.getItem('pageIntroSeen')) root.classList.add('skip-page-intro');
  else sessionStorage.setItem('pageIntroSeen', '1');
})();
