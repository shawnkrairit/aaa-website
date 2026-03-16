/* ── AAA Website — Main JS ── */

/** Sticky navbar scroll detection */
function initNavbar() {
  const header = document.querySelector('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
      header.style.background = 'rgba(255,255,255,0.98)';
      header.style.backdropFilter = 'blur(12px)';
      header.style.boxShadow = '0 1px 8px rgba(10,22,40,0.06)';
      header.style.borderColor = 'transparent';
    } else {
      header.classList.remove('scrolled');
      header.style.background = 'white';
      header.style.backdropFilter = 'blur(4px)';
      header.style.boxShadow = 'none';
      header.style.borderColor = '#EBEBEB';
    }
  }, { passive: true });

  /* Mobile menu toggle */
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      if (menuIconOpen) menuIconOpen.style.display = isOpen ? 'none' : 'block';
      if (menuIconClose) menuIconClose.style.display = isOpen ? 'block' : 'none';
    });

    /* Close mobile menu when clicking a link */
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        if (menuIconOpen) menuIconOpen.style.display = 'block';
        if (menuIconClose) menuIconClose.style.display = 'none';
      });
    });
  }

  /* Mobile dropdown expand */
  document.querySelectorAll('.mobile-dropdown-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = btn.nextElementSibling;
      const chevron = btn.querySelector('.mobile-chevron');
      if (panel) panel.classList.toggle('is-open');
      if (chevron) chevron.classList.toggle('rotate-180');
    });
  });
}

/** FAQ Accordion */
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (btn) {
      btn.addEventListener('click', () => {
        item.classList.toggle('is-open');
        const answer = item.querySelector('.faq-answer');
        if (answer) {
          if (item.classList.contains('is-open')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
          } else {
            answer.style.maxHeight = '0';
          }
        }
      });
    }
  });
}

/** News category filter */
function initNewsFilter() {
  const buttons = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-category]');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.filter;

      /* Update active button */
      buttons.forEach(b => {
        b.classList.remove('bg-navy', 'text-white');
        b.classList.add('bg-surface', 'text-text-muted');
      });
      btn.classList.remove('bg-surface', 'text-text-muted');
      btn.classList.add('bg-navy', 'text-white');

      /* Filter cards */
      cards.forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.category === cat) ? '' : 'none';
      });
    });
  });
}

/** Guide TOC active section tracking */
function initGuideToc() {
  const tocLinks = document.querySelectorAll('.toc-link');
  const headings = document.querySelectorAll('.guide-prose a[id]');
  if (!tocLinks.length || !headings.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        tocLinks.forEach(link => {
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('text-navy', 'border-gold');
            link.classList.remove('text-text-muted', 'border-transparent');
          } else {
            link.classList.remove('text-navy', 'border-gold');
            link.classList.add('text-text-muted', 'border-transparent');
          }
        });
      }
    });
  }, { rootMargin: '-80px 0px -60% 0px' });

  headings.forEach(h => observer.observe(h));

  /* Smooth scroll on click */
  tocLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ── Init everything after DOM + partials load ── */
window.addEventListener('DOMContentLoaded', () => {
  /* If partials aren't used (nav/footer inline), init directly */
  if (!document.getElementById('navbar-placeholder')) {
    initNavbar();
  }
  initFAQ();
  initNewsFilter();
  initGuideToc();
});
