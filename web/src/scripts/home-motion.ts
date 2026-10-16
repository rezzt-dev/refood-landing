import { animate, stagger } from 'animejs';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const wideViewport = window.matchMedia('(min-width: 900px) and (min-height: 800px)');
const root = document.documentElement;
const hero = document.querySelector<HTMLElement>('.hero');
const heroImage = hero?.querySelector<HTMLElement>('.hero-image');
const orbit = hero?.querySelector<HTMLElement>('.hero-orbit');
const project = document.querySelector<HTMLElement>('.project-section');
const projectStatement = project?.querySelector<HTMLElement>('.project-statement');
const story = document.querySelector<HTMLElement>('[data-story]');
const storyVisual = document.querySelector<HTMLElement>('[data-story-visual]');
const storyNumber = document.querySelector<HTMLElement>('[data-story-number]');
const storyName = document.querySelector<HTMLElement>('[data-story-name]');
const storySteps = [...document.querySelectorAll<HTMLElement>('[data-story-step]')];
const gallery = document.querySelector<HTMLElement>('[data-gallery]');
const galleryStage = document.querySelector<HTMLElement>('[data-gallery-stage]');
const galleryTrack = document.querySelector<HTMLElement>('[data-gallery-track]');
const galleryProgress = document.querySelector<HTMLElement>('[data-gallery-progress]');
const purpose = document.querySelector<HTMLElement>('[data-purpose]');
const purposeItems = [...document.querySelectorAll<HTMLElement>('.purpose-item')];
const clamp = (value: number) => Math.min(1, Math.max(0, value));
let frame = 0;

const updateGalleryProgress = (progress: number) => {
  galleryProgress?.style.setProperty('--gallery-progress', String(clamp(progress)));
};

const updateScrollMotion = () => {
  frame = 0;
  const viewportHeight = window.innerHeight;

  if (!reducedMotion.matches) {
    if (hero && heroImage && orbit) {
      const travel = Math.min(Math.max(window.scrollY, 0), hero.offsetHeight);
      heroImage.style.transform = `translate3d(0, ${travel * 0.18}px, 0) scale(1.06)`;
      orbit.style.transform = `translate3d(0, calc(-50% - ${travel * 0.12}px), 0)`;
    }

    if (project && projectStatement) {
      const bounds = project.getBoundingClientRect();
      const progress = clamp((viewportHeight - bounds.top) / (viewportHeight + bounds.height));
      projectStatement.style.setProperty('--project-shift', `${(progress - 0.5) * 110}px`);
    }

    if (story && storyVisual && storySteps.length) {
      const bounds = story.getBoundingClientRect();
      const progress = clamp((viewportHeight * 0.6 - bounds.top) / Math.max(1, bounds.height - viewportHeight * 0.2));
      storyVisual.style.setProperty('--story-progress', String(progress));
      storyVisual.style.setProperty('--story-rotation', `${progress * 330}deg`);
      storyVisual.style.setProperty('--story-counter-rotation', `${progress * -330}deg`);

      const focalPoint = viewportHeight * 0.53;
      const activeStep = storySteps.reduce((closest, step) => {
        const rect = step.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - focalPoint);
        return distance < closest.distance ? { step, distance } : closest;
      }, { step: storySteps[0], distance: Infinity }).step;

      storySteps.forEach((step) => step.classList.toggle('is-active', step === activeStep));
      if (storyNumber) storyNumber.textContent = activeStep.dataset.number ?? '01';
      if (storyName) storyName.textContent = activeStep.dataset.title ?? 'Explora';
    }

    if (purpose) {
      const bounds = purpose.getBoundingClientRect();
      const progress = clamp((viewportHeight - bounds.top) / (viewportHeight + bounds.height));
      purpose.style.setProperty('--purpose-shift', `${progress * -130}px`);
      purposeItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        item.classList.toggle('is-active', rect.top < viewportHeight * 0.7 && rect.bottom > viewportHeight * 0.3);
      });
    }
  }

  if (gallery && galleryStage && galleryTrack && root.classList.contains('scroll-enhanced')) {
    const bounds = gallery.getBoundingClientRect();
    const scrollDistance = Math.max(1, gallery.offsetHeight - galleryStage.offsetHeight);
    const progress = clamp((80 - bounds.top) / scrollDistance);
    const inset = Math.max(20, (window.innerWidth - 1200) / 2);
    const travel = Math.max(0, galleryTrack.scrollWidth + inset * 2 - window.innerWidth);
    galleryTrack.style.transform = `translate3d(${-travel * progress}px, 0, 0)`;
    updateGalleryProgress(progress);
  } else if (galleryTrack) {
    const scrollDistance = galleryTrack.scrollWidth - galleryTrack.clientWidth;
    updateGalleryProgress(scrollDistance > 0 ? galleryTrack.scrollLeft / scrollDistance : 1);
  }
};

const scheduleUpdate = () => {
  if (!frame) frame = window.requestAnimationFrame(updateScrollMotion);
};

const updateLayout = () => {
  const enhanced = wideViewport.matches && !reducedMotion.matches;
  root.classList.toggle('scroll-motion-ready', !reducedMotion.matches);
  root.classList.toggle('scroll-enhanced', enhanced);
  if (!enhanced && galleryTrack) galleryTrack.style.transform = '';
  scheduleUpdate();
};

if (!reducedMotion.matches) {
  const introParts = document.querySelectorAll<HTMLElement>('[data-intro] > *');
  if (introParts.length) {
    animate(introParts, {
      opacity: [0.7, 1],
      translateY: [24, 0],
      duration: 880,
      delay: stagger(115, { start: 100 }),
      ease: 'outQuint',
    });
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        animate(entry.target, {
          opacity: [0.35, 1],
          translateY: [28, 0],
          duration: 850,
          ease: 'outQuint',
        });
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((item) => observer.observe(item));
  }
}

window.addEventListener('scroll', scheduleUpdate, { passive: true });
window.addEventListener('resize', updateLayout, { passive: true });
galleryTrack?.addEventListener('scroll', scheduleUpdate, { passive: true });
reducedMotion.addEventListener('change', updateLayout);
wideViewport.addEventListener('change', updateLayout);
updateLayout();
