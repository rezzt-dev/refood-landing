const track = document.querySelector<HTMLElement>('[data-gallery-track]');
const controls = document.querySelector<HTMLElement>('[data-gallery-controls]');
const previous = document.querySelector<HTMLButtonElement>('[data-gallery-prev]');
const next = document.querySelector<HTMLButtonElement>('[data-gallery-next]');
const current = document.querySelector<HTMLElement>('[data-gallery-current]');
const cards = [...document.querySelectorAll<HTMLElement>('[data-gallery-card]')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (track && controls && previous && next && current && cards.length > 1) {
  let frame = 0;
  let activeIndex = 0;

  const update = () => {
    frame = 0;
    const trackCenter = track.getBoundingClientRect().left + track.clientWidth / 2;
    activeIndex = cards.reduce((closest, card, index) => {
      const bounds = card.getBoundingClientRect();
      const distance = Math.abs(bounds.left + bounds.width / 2 - trackCenter);
      return distance < closest.distance ? { index, distance } : closest;
    }, { index: 0, distance: Infinity }).index;

    const label = String(activeIndex + 1).padStart(2, '0');
    if (current.textContent !== label) current.textContent = label;
    previous.disabled = activeIndex === 0;
    next.disabled = activeIndex === cards.length - 1;
  };

  const scheduleUpdate = () => {
    if (!frame) frame = window.requestAnimationFrame(update);
  };

  const goTo = (index: number) => {
    const card = cards[index];
    if (!card) return;
    const left = card.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
    track.scrollTo({ left, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  };

  previous.addEventListener('click', () => goTo(activeIndex - 1));
  next.addEventListener('click', () => goTo(activeIndex + 1));
  track.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate, { passive: true });
  controls.classList.add('is-ready');
  update();
}
