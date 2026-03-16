(function () {
  if (document.documentElement.dataset.browser !== 'safari') return;
  document.documentElement.classList.add('browser-js-safari');

  var tickerObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var track = entry.target.querySelector('.ticker-track');
      if (!track) return;
      track.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
    });
  }, { threshold: 0 });

  document.querySelectorAll('.ticker').forEach(function (ticker) {
    tickerObserver.observe(ticker);
  });
})();
