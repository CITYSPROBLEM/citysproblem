(function () {
  function prepSectionAnimationState(sectionId, sectionEl) {
    if (!sectionEl) return;
    sectionEl.classList.remove('visible');

    if (sectionId === 'infoSection') {
      sectionEl.style.opacity = '0';
      sectionEl.style.transform = 'translateY(12px)';
      sectionEl.style.transition = 'none';
      return;
    }

    var revealSectionIds = new Set([
      'featuredRelease',
      'releasesSection',
      'datesSection',
      'pastShowsSection',
      'bookingSection',
      'newsletterSection'
    ]);
    if (!revealSectionIds.has(sectionId)) return;

    var staggerChildren = sectionEl.querySelectorAll(
      '.section-label, .featured-inner, .release-card, .date-row, .portfolio-card, .portfolio-link-card, .quote-card, .booking-signal-card, .portfolio-title, .portfolio-meta, .portfolio-link'
    );
    staggerChildren.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(12px)';
      el.style.transition = 'none';
    });
  }

  function applyPageSections(root) {
    var pageKey = document.documentElement.dataset.pageKey;
    var sections = (window.PAGE_SECTIONS && window.PAGE_SECTIONS[pageKey]) || {};
    var scope = root || document;

    // New schema: { sectionId: "<html>" }. Keep legacy array schema support.
    if (Array.isArray(sections)) {
      sections.forEach(function (entry) {
        if (!entry || !entry.selector) return;
        var legacyEl = scope.querySelector(entry.selector);
        if (!legacyEl) return;
        legacyEl.innerHTML = entry.html || '';
        var legacyId = entry.selector.charAt(0) === '#' ? entry.selector.slice(1) : entry.selector;
        prepSectionAnimationState(legacyId, legacyEl);
      });
      return;
    }

    Object.keys(sections).forEach(function (sectionId) {
      var el = scope.getElementById ? scope.getElementById(sectionId) : scope.querySelector('#' + sectionId);
      if (!el) return;
      el.innerHTML = sections[sectionId] || '';
      prepSectionAnimationState(sectionId, el);
    });
  }

  window.applyPageSections = applyPageSections;
  applyPageSections(document);
})();
