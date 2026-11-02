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

const thesisSlideshow = document.querySelector('[data-thesis-slideshow]');
const thesisSlides = thesisSlideshow ? [...thesisSlideshow.querySelectorAll('.thesis-slide')] : [];
if (thesisSlides.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let thesisSlideIndex = 0;
    window.setInterval(() => {
      thesisSlides[thesisSlideIndex].classList.remove('is-active');
      thesisSlideIndex = (thesisSlideIndex + 1) % thesisSlides.length;
      thesisSlides[thesisSlideIndex].classList.add('is-active');
    }, 5000);
}

const imageLightbox = document.querySelector('[data-image-lightbox]');

const filmoriaSlideshow = document.querySelector('[data-filmoria-slideshow]');
const filmoriaSlides = filmoriaSlideshow ? [...filmoriaSlideshow.querySelectorAll('.filmoria-slide')] : [];
const filmoriaBadge = document.querySelector('[data-filmoria-badge]');
if (filmoriaSlides.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let filmoriaSlideIndex = 0;
    window.setInterval(() => {
      filmoriaSlides[filmoriaSlideIndex].classList.remove('is-active');
      filmoriaSlideIndex = (filmoriaSlideIndex + 1) % filmoriaSlides.length;
      filmoriaSlides[filmoriaSlideIndex].classList.add('is-active');
      if (filmoriaBadge) {
        filmoriaBadge.textContent = `${filmoriaSlideIndex + 1} / ${filmoriaSlides.length}`;
      }
    }, 4500);
}
const expandImage = document.querySelector('.image-expand');
const closeLightbox = document.querySelector('[data-lightbox-close]');
const lightboxImg = imageLightbox?.querySelector('[data-lightbox-image]');
const lightboxTitle = imageLightbox?.querySelector('#lightbox-title');

document.querySelector('[data-case-study]')?.addEventListener('click', () => {
    if (lightboxImg) {
      lightboxImg.src = 'assets/images/SMAD_AI_GEO_Case_Study.webp';
      lightboxImg.alt = 'SMAD AI GEO case study test case';
    }
    if (lightboxTitle) lightboxTitle.textContent = 'Autonomous Mission Design · Test case';
    imageLightbox?.showModal();
});

expandImage?.addEventListener('click', () => {
    if (lightboxImg) {
      lightboxImg.src = 'content/enterprenuership/nestgo-thumbnail.webp';
      lightboxImg.alt = 'Full NestGo education platform infographic';
    }
    if (lightboxTitle) lightboxTitle.textContent = 'NestGo · Full infographic';
    imageLightbox?.showModal();
});

filmoriaSlideshow?.addEventListener('click', () => {
    const activeSlide = filmoriaSlideshow.querySelector('.filmoria-slide.is-active');
    if (activeSlide && imageLightbox) {
      if (lightboxImg) {
        lightboxImg.src = activeSlide.src;
        lightboxImg.alt = activeSlide.alt;
      }
      if (lightboxTitle) {
        lightboxTitle.textContent = activeSlide.alt || 'Filmoria Venture Gallery';
      }
      imageLightbox.showModal();
    }
});

closeLightbox?.addEventListener('click', () => imageLightbox?.close());
imageLightbox?.addEventListener('click', (event) => {
    if (event.target === imageLightbox) imageLightbox.close();
});
