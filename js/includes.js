/* ── Loads shared navbar + footer from partials ──
   These partials are trusted, locally-hosted HTML fragments — not user input. */
(async function() {
  /* Detect the base path by finding this script's own src attribute */
  const scripts = document.querySelectorAll('script[src]');
  let basePath = '';
  for (const s of scripts) {
    const src = s.getAttribute('src');
    if (src && src.includes('includes.js')) {
      // e.g. "../js/includes.js" → "../", "js/includes.js" → ""
      basePath = src.replace(/js\/includes\.js.*$/, '');
      break;
    }
  }

  /* Detect the site base for GitHub Pages link rewriting.
     e.g. https://user.github.io/repo-name/about/ → "/repo-name/"
     Returns null when no rewriting is needed (local dev, custom domain). */
  function detectSiteBase() {
    if (window.location.hostname.includes('github.io')) {
      const parts = window.location.pathname.split('/').filter(Boolean);
      if (parts.length > 0) return '/' + parts[0] + '/';
    }
    return null;
  }

  async function loadPartial(id, filePath) {
    const el = document.getElementById(id);
    if (!el) return;
    try {
      const res = await fetch(basePath + filePath);
      if (res.ok) {
        let html = await res.text();

        /* On GitHub Pages, rewrite absolute links like href="/about/"
           to href="/aaa-website/about/" so they work on the subpath */
        const siteBase = detectSiteBase();
        if (siteBase && siteBase !== '/') {
          html = html.replace(/href="\//g, 'href="' + siteBase);
        }

        // Safe: HTML is from our own trusted partials, not user input
        el.innerHTML = html; // eslint-disable-line no-unsanitized/property
      }
    } catch (e) {
      console.warn('Failed to load partial:', filePath, e);
    }
  }

  await Promise.all([
    loadPartial('navbar-placeholder', 'partials/navbar.html'),
    loadPartial('footer-placeholder', 'partials/footer.html'),
  ]);

  /* Init Lucide icons after partials are injected */
  if (window.lucide) {
    lucide.createIcons();
  }

  /* Init navbar interactions */
  if (typeof initNavbar === 'function') {
    initNavbar();
  }

  /* Remove loading class (anti-FOUC) */
  document.body.classList.remove('loading');
})();
