(function () {
  if (document.documentElement.dataset.browser !== 'chrome') return;
  document.documentElement.classList.add('browser-js-chrome');

  document.querySelectorAll('.ticker-track').forEach(function (track) {
    track.style.animationPlayState = 'running';
  });
})();
