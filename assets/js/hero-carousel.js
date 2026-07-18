// Carrusel de fondo del hero: crossfade automático entre láminas de Meyer,
// con puntos de navegación manual. Se puede reinicializar tras un swap de
// página (ver page-transitions.js en la versión "tratado").
(function () {
  function initHeroCarousel(root) {
    const scope = root || document;
    const carousel = scope.querySelector ? scope.querySelector('.hero-carousel') : null;
    if (!carousel || carousel.dataset.ffInit === '1') return;
    carousel.dataset.ffInit = '1';

    const slides = Array.from(carousel.querySelectorAll('.slide'));
    const dots = Array.from(carousel.querySelectorAll('.hero-dots button'));
    if (slides.length < 2) return;

    let current = slides.findIndex((s) => s.classList.contains('active'));
    if (current < 0) current = 0;
    let timer = null;

    function show(index) {
      const next = ((index % slides.length) + slides.length) % slides.length;
      if (next === current) return;
      slides[current].classList.remove('active');
      if (dots[current]) dots[current].classList.remove('active');
      current = next;
      slides[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
    }

    function restart() {
      if (timer) clearInterval(timer);
      timer = setInterval(() => show(current + 1), 5500);
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        show(i);
        restart();
      });
    });

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      restart();
    }
  }

  window.initHeroCarousel = initHeroCarousel;
  document.addEventListener('DOMContentLoaded', () => initHeroCarousel(document));
})();
