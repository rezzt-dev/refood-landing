const progress = document.querySelector<HTMLElement>('[data-scroll-progress]');
const header = document.querySelector<HTMLElement>('.site-header');
const backToTop = document.querySelector<HTMLAnchorElement>('[data-back-to-top]');
const sections = document.querySelectorAll<HTMLElement>('main section[id]');
const sectionLinks = document.querySelectorAll<HTMLAnchorElement>('.site-header a[href^="/#"]');
let frame = 0;

const updateScrollUi = () => {
  frame = 0;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
  if (progress) progress.style.transform = `scaleX(${ratio})`;
  header?.classList.toggle('is-scrolled', window.scrollY > 20);
  if (backToTop) backToTop.hidden = window.scrollY < Math.max(500, window.innerHeight * 0.8);
};

window.addEventListener('scroll', () => {
  if (!frame) frame = window.requestAnimationFrame(updateScrollUi);
}, { passive: true });
window.addEventListener('resize', updateScrollUi, { passive: true });
updateScrollUi();

if ('IntersectionObserver' in window && sections.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach((link) => {
        const active = link.hash === `#${entry.target.id}`;
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-25% 0px -65% 0px' });
  sections.forEach((section) => observer.observe(section));
}
