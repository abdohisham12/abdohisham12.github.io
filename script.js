const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

siteNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    projectCards.forEach((card) => {
      card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  });

  const journeyScenes = [...document.querySelectorAll('.journey-scene')];
  const journeyDots = [...document.querySelectorAll('.journey-dot')];
  const journeyPause = document.querySelector('[data-journey-pause]');
  let activeJourney = 0;
  let journeyPaused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let slideTimers = [];

  const stopJourneyMedia = () => {
    journeyScenes.forEach((scene) => {
      scene.querySelectorAll('video').forEach((video) => {
        video.pause();
        video.currentTime = 0;
      });
    });
    slideTimers.forEach((timer) => window.clearInterval(timer));
    slideTimers = [];
  };

  const startJourneyMedia = (scene) => {
    if (journeyPaused) return;
    const slides = [...scene.querySelectorAll('.journey-slide')];
    if (slides.length > 1) {
      let slideIndex = slides.findIndex((slide) => slide.classList.contains('is-active'));
      const timer = window.setInterval(() => {
        slides[slideIndex].classList.remove('is-active');
        slideIndex = (slideIndex + 1) % slides.length;
        slides[slideIndex].classList.add('is-active');
        slides.forEach((slide) => {
          if (slide.tagName === 'VIDEO') {
            if (slide.classList.contains('is-active')) slide.play().catch(() => {});
            else slide.pause();
          }
        });
      }, 6500);
      slideTimers.push(timer);
    }
    scene.querySelectorAll('video').forEach((video) => {
      if (video.classList.contains('is-active')) video.play().catch(() => {});
    });
  };

  const showJourneyScene = (index) => {
    if (!journeyScenes.length) return;
    activeJourney = (index + journeyScenes.length) % journeyScenes.length;
    stopJourneyMedia();
    journeyScenes.forEach((scene, sceneIndex) => {
      const isActive = sceneIndex === activeJourney;
      scene.classList.toggle('is-active', isActive);
      scene.setAttribute('aria-hidden', String(!isActive));
    });
    journeyDots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeJourney;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-selected', String(isActive));
    });
    startJourneyMedia(journeyScenes[activeJourney]);
  };

  document.querySelector('[data-journey-prev]')?.addEventListener('click', () => showJourneyScene(activeJourney - 1));
  document.querySelector('[data-journey-next]')?.addEventListener('click', () => showJourneyScene(activeJourney + 1));
  journeyDots.forEach((dot) => dot.addEventListener('click', () => showJourneyScene(Number(dot.dataset.journeyTo))));
  journeyPause?.addEventListener('click', () => {
    journeyPaused = !journeyPaused;
    journeyPause.textContent = journeyPaused ? 'Play media' : 'Pause media';
    journeyPause.setAttribute('aria-pressed', String(journeyPaused));
    if (journeyPaused) stopJourneyMedia();
    else startJourneyMedia(journeyScenes[activeJourney]);
  });
  document.addEventListener('keydown', (event) => {
    if (!document.querySelector('#experience')?.matches(':hover')) return;
    if (event.key === 'ArrowLeft') showJourneyScene(activeJourney - 1);
    if (event.key === 'ArrowRight') showJourneyScene(activeJourney + 1);
  });
  showJourneyScene(0);

  const aboutSlideshow = document.querySelector('[data-about-slideshow]');
  const aboutSlides = aboutSlideshow ? [...aboutSlideshow.querySelectorAll('.about-slideshow-image')] : [];
  if (aboutSlides.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let aboutSlideIndex = 0;
    window.setInterval(() => {
      aboutSlides[aboutSlideIndex].classList.remove('is-active');
      aboutSlideIndex = (aboutSlideIndex + 1) % aboutSlides.length;
      aboutSlides[aboutSlideIndex].classList.add('is-active');
    }, 6500);
  }
});
