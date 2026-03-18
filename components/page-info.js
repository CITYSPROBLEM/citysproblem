(function () {
  function applyPageInfo() {
    var pageInfoRoot = window.PAGE_INFO || {};
    var common = pageInfoRoot.common || {};
    var pages = pageInfoRoot.pages || {};
    var key = document.documentElement.dataset.pageKey;
    var page = pages[key];
    if (!page) return;

    function toAbsoluteUrl(path) {
      if (!path) return '';
      if (/^https?:\/\//i.test(path)) return path;
      var base = (common.baseUrl || '').replace(/\/$/, '');
      var normalizedPath = path.charAt(0) === '/' ? path : '/' + path;
      return base ? base + normalizedPath : normalizedPath;
    }

    function upsertMeta(kind, keyName, content) {
      var selector = 'meta[' + kind + '="' + keyName + '"]';
      var el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(kind, keyName);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content || '');
    }

    function upsertCanonical(url) {
      var el = document.head.querySelector('link[rel="canonical"]');
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', 'canonical');
        document.head.appendChild(el);
      }
      el.setAttribute('href', url || '');
    }

    var canonicalUrl = toAbsoluteUrl(page.canonicalPath || '/');
    var ogImageUrl = toAbsoluteUrl(common.ogImage || '/IMAGES/pfp-og-top.jpg');

    document.title = page.title || common.siteName || document.title;

    upsertMeta('name', 'description', page.description || '');
    upsertMeta('name', 'robots', page.robots || 'index, follow');
    upsertCanonical(canonicalUrl);

    upsertMeta('property', 'og:title', page.ogTitle || page.title || '');
    upsertMeta('property', 'og:description', page.ogDescription || page.description || '');
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', common.siteName || 'CITYSPROBLEM');
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:image', ogImageUrl);

    upsertMeta('name', 'twitter:card', common.twitterCard || 'summary_large_image');
    upsertMeta('name', 'twitter:title', page.twitterTitle || page.title || '');
    upsertMeta('name', 'twitter:description', page.twitterDescription || page.description || '');
    upsertMeta('name', 'twitter:url', canonicalUrl);
    upsertMeta('name', 'twitter:image', ogImageUrl);

    var schemaEl = document.getElementById('site-schema-json');
    if (!schemaEl) {
      schemaEl = document.createElement('script');
      schemaEl.id = 'site-schema-json';
      schemaEl.type = 'application/ld+json';
      document.head.appendChild(schemaEl);
    }
    schemaEl.textContent = JSON.stringify(common.schema || {}, null, 2);
  }

  window.applyPageInfo = applyPageInfo;
  applyPageInfo();
})();
