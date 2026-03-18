(function () {
  var siteContent = window.SITE_CONTENT || {};
  var brand = siteContent.brand || {};
  var navLinks = Array.isArray(siteContent.navLinks) ? siteContent.navLinks : [];
  var playerDefaults = siteContent.player || {};

  function samePath(urlA, urlB) {
    try {
      var a = new URL(urlA, window.location.href);
      var b = new URL(urlB, window.location.href);
      return a.origin === b.origin && a.pathname === b.pathname;
    } catch {
      return false;
    }
  }

  function renderTopbar() {
    var header = document.querySelector('header.topbar[data-component="topbar"]');
    if (!header) return;
    var isHomePage = !document.documentElement.classList.contains('page-subpage');

    var activeRoute = header.getAttribute('data-active-route') || '';
    var navHtml = navLinks.map(function (link) {
      var isActive = Boolean(activeRoute && samePath(link.href, activeRoute));
      var activeClass = isActive ? ' is-active' : '';
      var ariaCurrent = isActive ? ' aria-current="page"' : '';
      return '<a class="topbar-nav-link' + activeClass + '" href="' + link.href + '" data-route="' + link.href + '"' + ariaCurrent + '>' + link.label + '</a>';
    }).join('');

    header.innerHTML = [
      '<img class="topbar-logo" src="' + (brand.logoSrc || 'IMAGES/logo_white-128.png') + '" alt="' + (brand.logoAlt || 'CITYSPROBLEM') + '" width="' + (brand.logoWidth || 128) + '" height="' + (brand.logoHeight || 128) + '">',
      '<div class="topbar-title" id="topbarTitle">' + (brand.name || 'CITYSPROBLEM') + '</div>',
      '<nav class="topbar-nav' + (isHomePage ? ' topbar-nav-hidden' : '') + '" aria-label="Primary">' + navHtml + '</nav>'
    ].join('');
  }

  function renderPlayer() {
    var mount = document.querySelector('[data-component="player"]');
    if (!mount) return;

    mount.innerHTML = [
      '<div class="player" id="player">',
      '  <div class="player-inner" id="playerInner">',
      '    <div class="player-controls">',
      '      <button class="player-btn player-btn-skip" id="btnPrev" style="transform:scaleX(-1)">\u25B6\uFE0E\u25B6\uFE0E</button>',
      '      <button class="player-btn player-btn-play" id="btnPlay">\u25B6\uFE0E</button>',
      '      <button class="player-btn player-btn-skip" id="btnNext">\u25B6\uFE0E\u25B6\uFE0E</button>',
      '      <button class="player-btn player-btn-shuffle" id="btnShuffle">\u21C6</button>',
      '    </div>',
      '    <span class="player-time-disp" id="playerTimeCurrent">' + (playerDefaults.initialCurrentTime || '0:00') + '</span>',
      '    <div class="player-progress" id="playerProgress">',
      '      <div class="player-fill" id="playerFill"></div>',
      '    </div>',
      '    <span class="player-time-disp" id="playerTimeTotal">' + (playerDefaults.initialTotalTime || '0:00') + '</span>',
      '    <span class="player-counter" id="playerCounter">' + (playerDefaults.initialCounter || '1 / 1') + '</span>',
      '    <div class="player-volume-row">',
      '      <input class="player-vol-slider" id="volSlider" type="range" min="0" max="1" step="0.01" value="1">',
      '    </div>',
      '    <div class="player-track-clip"><span class="player-track-name" id="playerTrack">' + (playerDefaults.initialTrackName || '\u2014') + '</span></div>',
      '  </div>',
      '</div>',
      '<audio id="audio" preload="none"></audio>',
      '<div class="tap-hint" id="tapHint"></div>'
    ].join('\n');
  }

  renderTopbar();
  renderPlayer();
})();
