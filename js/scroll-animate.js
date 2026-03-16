/* ── Scroll-triggered animations via IntersectionObserver ── */
(function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '-60px' });

  /* Observe after DOM is ready and partials are loaded */
  function observe() {
    document.querySelectorAll('[data-animate], [data-stagger]').forEach(el => {
      observer.observe(el);
    });
  }

  /* Run after a short delay to ensure partials + Tailwind are ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(observe, 100));
  } else {
    setTimeout(observe, 100);
  }
})();
