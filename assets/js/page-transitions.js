// Experimento: navegación tipo "tratado antiguo" — cada página se comporta
// como una hoja que se da vuelta al pasar a la siguiente sección.
(function () {
  const PAGES = ['index.html','nosotros.html','disciplinas.html','horarios.html','galeria.html','blog.html','articulo-fechtbuch.html','contacto.html'];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const supportsFetch = 'fetch' in window;

  function currentSlug() {
    let p = location.pathname.split('/').pop();
    if (!p || !PAGES.includes(p)) p = 'index.html';
    return p;
  }

  function isInternalPageLink(a) {
    if (!a || !a.href) return false;
    if (a.origin !== location.origin) return false;
    if (a.hasAttribute('target') && a.getAttribute('target') !== '_self') return false;
    if (a.hasAttribute('download')) return false;
    const slug = a.pathname.split('/').pop() || 'index.html';
    return PAGES.includes(slug);
  }

  function setActiveNav(slug) {
    document.querySelectorAll('nav.main-nav a').forEach(a => {
      const aslug = a.pathname.split('/').pop() || 'index.html';
      a.classList.toggle('active', aslug === slug);
    });
  }

  function initRevealObserver(root) {
    const els = root.querySelectorAll('.reveal');
    if (!els.length) return;
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { threshold: 0.15 });
      els.forEach(el => io.observe(el));
    } else {
      els.forEach(el => el.classList.add('in'));
    }
  }

  async function swapTo(url, slug, push) {
    const page = document.getElementById('page');
    if (!page) { location.href = url; return; }

    let html;
    try {
      const res = await fetch(url, { credentials: 'same-origin' });
      if (!res.ok) throw new Error('bad response');
      html = await res.text();
    } catch (err) {
      location.href = url; // sin JS/fetch disponible: navegación normal
      return;
    }

    const doc = new DOMParser().parseFromString(html, 'text/html');
    const newPage = doc.getElementById('page');
    if (!newPage) { location.href = url; return; }

    const newTitle = doc.title;

    if (reduceMotion) {
      page.innerHTML = newPage.innerHTML;
      document.title = newTitle;
      setActiveNav(slug);
      initRevealObserver(page);
    if (window.initHeroCarousel) window.initHeroCarousel(page);
      window.scrollTo(0, 0);
      if (push) history.pushState({ slug }, '', url);
      return;
    }

    page.classList.add('leaving');
    await new Promise(r => setTimeout(r, 460));

    page.innerHTML = newPage.innerHTML;
    document.title = newTitle;
    setActiveNav(slug);
    window.scrollTo(0, 0);

    page.classList.remove('leaving');
    page.classList.add('entering');
    // forzar reflow para que el navegador aplique el estado "entering" antes de animarlo
    void page.offsetWidth;
    page.classList.remove('entering');
    page.classList.add('settled');

    initRevealObserver(page);
    if (window.initHeroCarousel) window.initHeroCarousel(page);
    if (push) history.pushState({ slug }, '', url);

    setTimeout(() => page.classList.remove('settled'), 520);
  }

  if (supportsFetch) {
    document.addEventListener('click', (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest('a');
      if (!isInternalPageLink(a)) return;
      e.preventDefault();
      const slug = a.pathname.split('/').pop() || 'index.html';
      if (slug === currentSlug()) return;
      swapTo(a.href, slug, true);
    });

    window.addEventListener('popstate', () => {
      swapTo(location.href, currentSlug(), false);
    });

    history.replaceState({ slug: currentSlug() }, '', location.href);
  }
})();
