// Note: Download CV button now uses direct link, no JS needed

// Hero Stats Carousel Animation
function initStatsCarousel() {
    const carousel = document.querySelector('.hero-stats-carousel');
    if (!carousel) return;
    
    const statItems = carousel.querySelectorAll('.stat-item');
    const statNumbers = carousel.querySelectorAll('.stat-number');
    
    // Animate numbers
    function animateNumber(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (target === 95 ? '%' : target === 40 ? '%' : '+');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (target === 95 ? '%' : target === 40 ? '%' : '+');
            }
        }, 16);
    }
    
    // Rotate through stats
    let currentIndex = 0;
    function rotateStats() {
        statItems.forEach((item, index) => {
            item.classList.remove('active');
        });
        statItems[currentIndex].classList.add('active');
        // Only animate if the stat-number has a data-target attribute (for numbers)
        const currentStatNumber = statNumbers[currentIndex];
        if (currentStatNumber && currentStatNumber.hasAttribute('data-target')) {
            animateNumber(currentStatNumber);
        }
        currentIndex = (currentIndex + 1) % statItems.length;
    }
    
    // Start rotation after initial animation
    setTimeout(() => {
        rotateStats();
        setInterval(rotateStats, 3000);
    }, 1000);
}

// Initialize stats carousel on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStatsCarousel);
} else {
    initStatsCarousel();
}

// Quick Navigation Sidebar
function initQuickNav() {
    const quickNav = document.getElementById('quick-nav-sidebar');
    if (!quickNav) return;
    
    const navLinks = quickNav.querySelectorAll('.quick-nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Show sidebar after scrolling
    function toggleSidebar() {
        if (window.scrollY > 300) {
            quickNav.classList.add('visible');
        } else {
            quickNav.classList.remove('visible');
        }
    }
    
    // Update active link based on scroll position
    function updateActiveLink() {
        const scrollPosition = window.pageYOffset + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Smooth scroll on click
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Throttled scroll handler for better performance
    const throttledScrollHandler = throttle(() => {
        toggleSidebar();
        updateActiveLink();
    }, 100);
    
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    
    toggleSidebar();
    updateActiveLink();
}

// Initialize quick nav on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQuickNav);
} else {
    initQuickNav();
}

// Enhanced Skills Tooltips
function initSkillTooltips() {
    const skillContainers = document.querySelectorAll('.skill-container[data-skill-filter]');
    if (!skillContainers.length) return;

    const projectMap = {
        'TensorFlow': 'SIRB, Ionospheric Forecasting',
        'Python': 'All projects - Core language for AI/ML development',
        'LLM': 'Autonomous Mission Design (RAG)',
        'LLM Technologies': 'Autonomous Mission Design (RAG)',
        'RAG': 'Autonomous Mission Design - Graduation Project',
        'Computer': 'SIRB Project - 95%+ accuracy',
        'Computer Vision': 'SIRB Project - 95%+ accuracy',
        'PyTorch': 'Autonomous Mission Design',
        'Microsoft': 'Cloud deployment',
        'Microsoft Azure': 'Cloud deployment'
    };

    const supportsHoverQuery = window.matchMedia('(hover: hover)');
    const persistentQuery = window.matchMedia('(max-width: 600px)');
    const supportsHover = supportsHoverQuery.matches;

    const addMediaListener = (mq, handler) => {
        if (typeof mq.addEventListener === 'function') {
            mq.addEventListener('change', handler);
        } else if (typeof mq.addListener === 'function') {
            mq.addListener(handler);
        }
    };

    const hideAllTooltips = () => {
        if (persistentQuery.matches) return;
        skillContainers.forEach(container => {
            const tooltip = container.querySelector('.skill-tooltip');
            if (tooltip) {
                tooltip.classList.remove('visible');
                container.setAttribute('aria-expanded', 'false');
            }
        });
    };

    if (!supportsHover) {
        document.addEventListener('click', (event) => {
            if (!event.target.closest('.skill-container[data-skill-filter]')) {
                hideAllTooltips();
            }
        });
    }
    
    skillContainers.forEach(container => {
        const heading = container.querySelector('.skill-name .h3');
        const rawName = heading?.textContent?.trim() || '';
        const lookupKey = rawName.split(' ')[0];
        const projectList = projectMap[rawName] || projectMap[lookupKey] || 'Multiple projects';
        
        container.setAttribute('tabindex', '0');
        container.setAttribute('role', 'button');
        container.setAttribute('aria-expanded', persistentQuery.matches ? 'true' : 'false');

        const tooltip = document.createElement('div');
        tooltip.className = 'skill-tooltip';
        tooltip.textContent = `Used in: ${projectList}`;
        container.appendChild(tooltip);

        const showTooltip = () => {
            if (persistentQuery.matches) return;
            tooltip.classList.add('visible');
            container.setAttribute('aria-expanded', 'true');
        };

        const hideTooltip = () => {
            if (persistentQuery.matches) return;
            tooltip.classList.remove('visible');
            container.setAttribute('aria-expanded', 'false');
        };

        const toggleTooltip = () => {
            if (persistentQuery.matches) return;
            const isVisible = tooltip.classList.contains('visible');
            hideAllTooltips();
            if (!isVisible) {
                tooltip.classList.add('visible');
                container.setAttribute('aria-expanded', 'true');
            }
        };

        if (supportsHover) {
            container.addEventListener('mouseenter', showTooltip);
            container.addEventListener('mouseleave', hideTooltip);
        } else {
            container.addEventListener('click', (event) => {
                event.stopPropagation();
                toggleTooltip();
            });
            container.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    toggleTooltip();
                }
            });
        }

        container.addEventListener('focus', showTooltip);
        container.addEventListener('blur', hideTooltip);

        const applyPersistentState = (matches) => {
            if (matches) {
                tooltip.classList.add('always-visible', 'visible');
                container.setAttribute('aria-expanded', 'true');
            } else {
                tooltip.classList.remove('always-visible');
                tooltip.classList.remove('visible');
                container.setAttribute('aria-expanded', 'false');
            }
        };

        applyPersistentState(persistentQuery.matches);
        addMediaListener(persistentQuery, (event) => applyPersistentState(event.matches));
    });
}

// Initialize skill tooltips
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSkillTooltips);
} else {
    initSkillTooltips();
}

// Animated Counters for Metrics Dashboard
function initMetricCounters() {
    const metricValues = document.querySelectorAll('.metric-value[data-target]');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    };
    
    // Use Intersection Observer to trigger animation when section is visible
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const metricCard = entry.target.closest('.metric-card');
                const metricValue = metricCard.querySelector('.metric-value[data-target]');
                if (metricValue && !metricValue.classList.contains('animated')) {
                    metricValue.classList.add('animated');
                    animateCounter(metricValue);
                }
            }
        });
    }, observerOptions);
    
    metricValues.forEach(value => {
        const metricCard = value.closest('.metric-card');
        if (metricCard) {
            observer.observe(metricCard);
        }
    });
}

// Initialize metric counters
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMetricCounters);
} else {
    initMetricCounters();
}

// Enhanced fade-in for certifications section
document.addEventListener('DOMContentLoaded', () => {
    const certificationsSection = document.querySelector('.certifications-showcase');
    if (certificationsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(certificationsSection);
    }
    
    // Also observe metrics dashboard
    const metricsDashboard = document.querySelector('.metrics-dashboard');
    if (metricsDashboard) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(metricsDashboard);
    }
});

// Active Navigation Link Highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPosition = window.pageYOffset + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Throttle function for performance optimization
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handlers with throttling
const throttledUpdateActiveNavLink = throttle(updateActiveNavLink, 100);
const throttledUpdateScrollProgress = throttle(() => {
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
        scrollProgress.setAttribute('aria-valuenow', Math.round(scrolled));
    }
}, 16); // ~60fps

// Update active nav link on scroll
window.addEventListener('scroll', throttledUpdateActiveNavLink, { passive: true });
window.addEventListener('load', updateActiveNavLink);

// Scroll Progress Indicator - Using throttled version defined above
document.addEventListener('DOMContentLoaded', () => {
    const scrollProgress = document.getElementById('scroll-progress');
    
    if (scrollProgress) {
        window.addEventListener('scroll', throttledUpdateScrollProgress, { passive: true });
        throttledUpdateScrollProgress(); // Initial update
    }
});

// Back to Top Button
document.addEventListener('DOMContentLoaded', () => {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        function toggleBackToTop() {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'flex';
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
                setTimeout(() => {
                    if (!backToTopBtn.classList.contains('show')) {
                        backToTopBtn.style.display = 'none';
                    }
                }, 300);
            }
        }
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        const throttledToggleBackToTop = throttle(toggleBackToTop, 100);
        window.addEventListener('scroll', throttledToggleBackToTop, { passive: true });
        toggleBackToTop();
    }
    
    // Smooth Scroll Animations with Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    const animatedElements = document.querySelectorAll(
        '.highlight-card, .education-card, .experience-card, .project-container, .skill-container, .executive-summary-card, .quick-facts-card'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in-element');
        observer.observe(el);
    });
    
    // Parallax Effect for Hero Section
    const hero = document.querySelector('.hero');
    const heroShapes = document.querySelectorAll('.shape');
    
    if (hero && heroShapes.length > 0) {
        const throttledParallax = throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            
            heroShapes.forEach((shape, index) => {
                const speed = 0.3 + (index * 0.1);
                shape.style.transform = `translateY(${rate * speed}px)`;
            });
        }, 16); // ~60fps for smooth parallax
        
        window.addEventListener('scroll', throttledParallax, { passive: true });
    }
});

// Hamburger Menu Toggle with Backdrop
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    // Create backdrop element if it doesn't exist
    let backdrop = document.querySelector('.nav-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'nav-backdrop';
        backdrop.setAttribute('aria-hidden', 'true');
        document.body.appendChild(backdrop);
    }
    
    // Function to open menu
    const openMenu = () => {
        hamburgerMenu.classList.add('active');
        navLinks.classList.add('active');
        backdrop.classList.add('active');
        hamburgerMenu.setAttribute('aria-expanded', 'true');
        backdrop.setAttribute('aria-hidden', 'false');
        // Prevent body scroll when menu is open
        body.style.overflow = 'hidden';
    };
    
    // Function to close menu
    const closeMenu = () => {
        hamburgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
        backdrop.classList.remove('active');
        hamburgerMenu.setAttribute('aria-expanded', 'false');
        backdrop.setAttribute('aria-hidden', 'true');
        // Restore body scroll
        body.style.overflow = '';
    };
    
    if (hamburgerMenu && navLinks && backdrop) {
        // Toggle menu on hamburger click
        hamburgerMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = hamburgerMenu.classList.contains('active');
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        
        // Close menu when clicking on backdrop
        backdrop.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMenu();
        });
        
        // Close menu when clicking on a nav link
        const navLinkElements = navLinks.querySelectorAll('.nav-link');
        navLinkElements.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });
        
        // Ensure CV button click works properly - close menu if open and allow navigation
        const cvButton = document.querySelector('.nav-cv-button[data-cv-link="true"]');
        if (cvButton) {
            cvButton.addEventListener('click', (e) => {
                // Close menu if it's open
                if (hamburgerMenu.classList.contains('active')) {
                    closeMenu();
                }
                // Allow the link to navigate normally - don't prevent default
                // The link will open in new tab as specified in HTML
            });
        }
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && hamburgerMenu.classList.contains('active')) {
                closeMenu();
            }
        });
        
        // Close menu when window is resized to desktop size
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth > 768 && hamburgerMenu.classList.contains('active')) {
                    closeMenu();
                }
            }, 250);
        });
    }
});

// Hero Landing Animations - Improved with immediate CSS animation trigger
function initHeroAnimations() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Skip animations for users who prefer reduced motion
        const heroElements = document.querySelectorAll('.animate-fade-in-up, .animate-scale-in');
        heroElements.forEach((element) => {
            element.style.opacity = '1';
            element.style.transform = 'none';
            element.style.animation = 'none';
        });
        return;
    }
    
    const heroElements = document.querySelectorAll('.animate-fade-in-up, .animate-scale-in');
    
    heroElements.forEach((element) => {
        const delay = element.getAttribute('data-delay') || '0s';
        // Use CSS animation delay instead of setTimeout for better performance
        element.style.animationDelay = delay;
        // Ensure animation class is applied
        if (!element.classList.contains('animate-fade-in-up') && !element.classList.contains('animate-scale-in')) {
            if (element.classList.contains('animate-scale-in')) {
                element.classList.add('animate-scale-in');
            } else {
                element.classList.add('animate-fade-in-up');
            }
        }
    });
}

// Initialize hero animations on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroAnimations);
} else {
    initHeroAnimations();
}

// Global Error Handler for Production
(function() {
    'use strict';
    
    // Only log errors in development
    const isDevelopment = window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1' ||
                         window.location.hostname.includes('dev');
    
    // Global error handler
    window.addEventListener('error', function(event) {
        if (isDevelopment) {
            console.error('Global error:', event.error);
        }
        // In production, you could send this to an error tracking service
        // Example: if (window.Sentry) { window.Sentry.captureException(event.error); }
        
        // Prevent default error handling for non-critical errors
        if (event.filename && event.filename.includes('cobe')) {
            event.preventDefault();
            // Silently handle cobe library errors
            return false;
        }
    }, true);
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', function(event) {
        if (isDevelopment) {
            console.error('Unhandled promise rejection:', event.reason);
        }
        // In production, you could send this to an error tracking service
        // Example: if (window.Sentry) { window.Sentry.captureException(event.reason); }
        
        // Prevent default error handling
        event.preventDefault();
    });
})();

// Animate project cards
const projectCards = document.querySelectorAll('.project-container');
if (projectCards.length > 0) {
    projectCards.forEach((card) => {
        card.classList.add('animate');
        setTimeout(() => {
            card.classList.remove('animate');
        }, 2000);
    });
}

// Animate skill cards
const skillCards = document.querySelectorAll('.skill-container');
if (skillCards.length > 0) {
    skillCards.forEach((card) => {
        card.classList.add('animate');
        setTimeout(() => {
            card.classList.remove('animate');
        }, 2000);
    });
}

function toggleCertificate(button) {
    if (!button) return;
    const certificateSection = button.nextElementSibling;
    if (!certificateSection) return;
    if (certificateSection.classList.contains('hidden')) {
        certificateSection.classList.remove('hidden');
        certificateSection.style.display = 'block';
        button.textContent = 'Hide Certificate';
        // Smooth scroll to certificate
        certificateSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        certificateSection.classList.add('hidden');
        certificateSection.style.display = 'none';
        button.textContent = 'Show Certificate';
    }
}
const certificateImages = document.querySelectorAll('.certificate img');
if (certificateImages.length > 0) {
    certificateImages.forEach((img) => {
        img.onload = () => {
            if (img.naturalHeight > img.naturalWidth) {
                img.classList.add('vertical');
            }
        };
    });
}

// Scroll-triggered fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

let observer;
if (typeof IntersectionObserver !== 'undefined') {
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
} else {
    // Fallback for browsers without IntersectionObserver support
    // IntersectionObserver not supported in this browser
}

// Function to show visible sections immediately
function showVisibleSections() {
    // Show all sections that are in or near viewport
    const allSections = document.querySelectorAll('#about-me, .experience, .projects, .skills');
    allSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 1.5) { // If section is within 1.5 viewport heights
            section.classList.add('fade-in');
        }
    });
    
    const allJobs = document.querySelectorAll('.job');
    allJobs.forEach(job => {
        const rect = job.getBoundingClientRect();
        if (rect.top < window.innerHeight * 1.5) {
            job.classList.add('fade-in');
        }
    });
    
    const allProjects = document.querySelectorAll('.project-container');
    allProjects.forEach(project => {
        const rect = project.getBoundingClientRect();
        if (rect.top < window.innerHeight * 1.5) {
            project.classList.add('fade-in');
        }
    });
}

// Run immediately and also on DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showVisibleSections);
} else {
    showVisibleSections();
}

// Also run after a short delay as fallback
setTimeout(showVisibleSections, 50);

// Observe sections for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    // Immediately show top sections (education, about-me) since they're visible on load
    const education = document.querySelector('#education, .education');
    if (education) {
        education.classList.add('fade-in');
    }
    
    const aboutMe = document.querySelector('#about-me');
    if (aboutMe) {
        aboutMe.classList.add('fade-in');
    }
    
    // Show experience section and all jobs immediately
    const experienceSection = document.querySelector('.experience');
    if (experienceSection) {
        experienceSection.classList.add('fade-in');
        // Show all jobs in experience section
        const experienceJobs = experienceSection.querySelectorAll('.job');
        experienceJobs.forEach((job, index) => {
            setTimeout(() => {
                job.classList.add('fade-in');
            }, index * 100); // Stagger the animations slightly
        });
    }
    
    // Show projects section and all project containers immediately
    const projectsSection = document.querySelector('.projects');
    if (projectsSection) {
        projectsSection.classList.add('fade-in');
        // Show all project containers in projects section
        const projectContainers = projectsSection.querySelectorAll('.project-container');
        projectContainers.forEach((container, index) => {
            setTimeout(() => {
                container.classList.add('fade-in');
            }, index * 150); // Stagger the animations slightly
        });
    }
    
    const sections = document.querySelectorAll('.skills');
    sections.forEach(section => {
        // Check if section is already in viewport on load
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible) {
            section.classList.add('fade-in');
        } else {
            if (observer) observer.observe(section);
        }
    });

    // Observe job cards in other sections (like education) with staggered delay
    const allJobs = document.querySelectorAll('.job');
    allJobs.forEach((job, index) => {
        // Skip jobs in experience section as they're already handled above
        if (!job.closest('.experience')) {
            const rect = job.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            if (isVisible) {
                job.classList.add('fade-in');
            } else {
                if (observer) observer.observe(job);
            }
        }
    });

    // Observe project cards in other sections (if any) with staggered delay
    const allProjectCards = document.querySelectorAll('.project-container');
    allProjectCards.forEach((card, index) => {
        // Skip project containers in projects section as they're already handled above
        if (!card.closest('.projects')) {
            const rect = card.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            if (isVisible) {
                card.classList.add('fade-in');
            } else {
                if (observer) observer.observe(card);
            }
        }
    });
    
    // Show contact section immediately
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
        contactSection.classList.add('fade-in');
    }
});

// Contact Form Handling with Rate Limiting
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formMessage = document.getElementById('form-message');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    if (!contactForm) return;
    
    // Check if all required elements exist
    if (!emailInput || !messageInput || !submitBtn || !formMessage || !emailError || !messageError) {
        // Contact form elements not found
        return;
    }

    // Rate limiting: Track submission attempts
    const RATE_LIMIT_KEY = 'contact_form_submissions';
    const RATE_LIMIT_WINDOW = 60000; // 1 minute in milliseconds
    const MAX_SUBMISSIONS = 3; // Max 3 submissions per minute
    
    function checkRateLimit() {
        const now = Date.now();
        const submissions = JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) || '[]');
        // Filter out old submissions outside the time window
        const recentSubmissions = submissions.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW);
        
        if (recentSubmissions.length >= MAX_SUBMISSIONS) {
            const timeRemaining = Math.ceil((RATE_LIMIT_WINDOW - (now - recentSubmissions[0])) / 1000);
            return {
                allowed: false,
                message: `Too many submissions. Please wait ${timeRemaining} seconds before trying again.`
            };
        }
        
        // Add current submission timestamp
        recentSubmissions.push(now);
        localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recentSubmissions));
        return { allowed: true };
    }

    // Real-time validation
    emailInput.addEventListener('blur', validateEmail);
    messageInput.addEventListener('blur', validateMessage);

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            showError(emailError, 'Email is required');
            emailInput.classList.add('error');
            return false;
        } else if (!emailRegex.test(email)) {
            showError(emailError, 'Please enter a valid email address');
            emailInput.classList.add('error');
            return false;
        } else {
            hideError(emailError);
            emailInput.classList.remove('error');
            return true;
        }
    }

    function validateMessage() {
        const message = messageInput.value.trim();
        
        if (!message) {
            showError(messageError, 'Message is required');
            messageInput.classList.add('error');
            return false;
        } else if (message.length < 10) {
            showError(messageError, 'Message must be at least 10 characters');
            messageInput.classList.add('error');
            return false;
        } else {
            hideError(messageError);
            messageInput.classList.remove('error');
            return true;
        }
    }

    function showError(errorElement, message) {
        if (!errorElement) return;
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    function hideError(errorElement) {
        if (!errorElement) return;
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }

    function showFormMessage(message, type) {
        if (!formMessage) return;
        formMessage.textContent = message;
        formMessage.className = `form-message ${type} show`;
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function hideFormMessage() {
        formMessage.classList.remove('show');
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = 'form-message';
        }, 300);
    }

    // Form submission with rate limiting
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Check rate limit
        const rateLimitCheck = checkRateLimit();
        if (!rateLimitCheck.allowed) {
            showFormMessage(rateLimitCheck.message, 'error');
            return;
        }

        // Validate all fields
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        if (!isEmailValid || !isMessageValid) {
            showFormMessage('Please fix the errors above', 'error');
            return;
        }

        // Disable submit button and show loading state
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');

        const formData = new FormData(contactForm);

        try {
            // Submit to Formspree
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            // Check Content-Type header before parsing response
            const contentType = response.headers.get('content-type');
            const isJson = contentType && contentType.includes('application/json');

            if (response.ok) {
                // If response is JSON, parse it to check for any warnings
                if (isJson) {
                    try {
                        const data = await response.json();
                        // Formspree may return JSON with success message
                        if (data.error) {
                            showFormMessage('There was an error with your submission. Please try again or email me directly at abdulrahmanhishamk@gmail.com', 'error');
                            return;
                        }
                    } catch (e) {
                        // If JSON parsing fails, assume success (Formspree HTML success page)
                        // Could not parse response as JSON, assuming success
                    }
                }
                // Success - Formspree accepted the form
                showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                // Clear any error states
                emailInput.classList.remove('error');
                messageInput.classList.remove('error');
                hideError(emailError);
                hideError(messageError);
            } else {
                // Error response - try to parse JSON if available
                if (isJson) {
                    try {
                        const data = await response.json();
                        if (data.errors) {
                            showFormMessage('There was an error with your submission. Please try again or email me directly at abdulrahmanhishamk@gmail.com', 'error');
                        } else {
                            showFormMessage('Failed to send message. Please try again or email me directly at abdulrahmanhishamk@gmail.com', 'error');
                        }
                    } catch (e) {
                        // If JSON parsing fails, show generic error
                        showFormMessage('Failed to send message. Please try again or email me directly at abdulrahmanhishamk@gmail.com', 'error');
                    }
                } else {
                    // HTML error response
                    showFormMessage('Failed to send message. Please try again or email me directly at abdulrahmanhishamk@gmail.com', 'error');
                }
            }
        } catch (error) {
            // Error sending message
            showFormMessage('Failed to send message. Please try again or email me directly at abdulrahmanhishamk@gmail.com', 'error');
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            
            // Hide message after 5 seconds
            setTimeout(() => {
                hideFormMessage();
            }, 5000);
        }
    });
});

// Education & Work History Flip Cards and Auto-Rotation
document.addEventListener('DOMContentLoaded', () => {
    // Position data structure (previous positions only - current positions are separate cards)
    const workHistoryPositions = [
        {
            title: 'AI Software Engineer',
            company: 'Scale Labs',
            date: 'Sep 2024 - Nov 2024',
            logo: 'assets/logos/outlier_logo.png',
            preview: 'Evaluated and improved 1,000+ code samples for state-of-the-art generative AI model training',
            responsibilities: [
                'Evaluate and improve code samples for generative AI model training',
                'Develop comprehensive question sets and solutions for computer science education',
                'Maintain rigorous quality standards for AI-generated code (Python, MySQL, C++)',
                'Assess code quality and provide feedback for model improvement'
            ],
            details: {
                achievements: [
                    '✓ Improved <strong>1,000+ code samples</strong> for generative AI training',
                    '✓ Created <strong>200+ question sets</strong> for CS education',
                    '✓ <strong>25%</strong> code acceptance improvement via quality standards'
                ]
            }
        },
        {
            company: 'Egyptian Space Agency (EgSA)',
            location: 'EgSA labs',
            date: 'Jan 2024 - Sep 2024',
            logo: 'assets/logos/egsa_logo.png',
            preview: 'Space environment training and satellite subsystems expertise',
            responsibilities: [
                'Develop deep learning models for space-weather prediction',
                'Process and analyze large-scale space environment data',
                'Implement LSTM/GRU architectures with attention mechanisms',
                'Complete intensive training on space environment and space weather',
                'Study satellite subsystems (power, OBC, communication, payload, ADCS, structural)',
                'Participate in hands-on satellite integration and testing procedures',
                'Learn end-to-end satellite development lifecycle',
                'Complete Space Keys educational program'
            ],
            details: {
                achievements: [
                    '✓ <strong>87% accuracy</strong> predicting ionospheric disturbances (LSTM/GRU)',
                    '✓ Processed <strong>50K+ data points</strong> for space-weather models',
                    '✓ Completed 2-week intensive training on space environment & weather',
                    '✓ Mastered satellite subsystems (power, OBC, comms, payload, ADCS)',
                    '✓ Hands-on satellite integration & testing experience',
                    '✓ End-to-end satellite development lifecycle knowledge'
                ]
            }
        },
        {
            title: 'IT Engineer Trainee',
            company: 'EGYPTAIR TRAINING ACADEMY',
            location: 'Cairo Airport IT center',
            date: 'Aug 2023 - Sep 2023',
            logo: 'assets/logos/egyair_logo.png',
            preview: 'Designed and implemented secure VPN tunnel architecture and VoIP solutions',
            responsibilities: [
                'Designed and implemented secure VPN tunnel architecture and VoIP solutions',
                'Built secure VPN tunnels (Hyper-V) for multi-system architecture',
                'Developed enterprise VoIP solutions',
                'Network security simulations & vulnerability assessments (PNetLab)'
            ],
            details: {
                achievements: [
                    '✓ Built secure VPN tunnels (Hyper-V) for multi-system architecture',
                    '✓ Developed enterprise VoIP solutions',
                    '✓ Network security simulations & vulnerability assessments (PNetLab)',
                    '✓ Aviation systems exposure (Jeppesen, SITA protocols)'
                ]
            }
        },
        {
            title: 'Summer Trainee',
            company: 'National Research Institute of Astronomy and Geophysics (NRIAG)',
            location: 'NRIAG R&D centers',
            date: 'Sep 2023 - Oct 2023',
            logo: 'assets/logos/nriag_logo.png',
            preview: 'Optimized satellite performance and collaborated on AI algorithm development',
            responsibilities: [
                'Optimize satellite performance through parameter tuning and analysis',
                'Design sequential circuits using Cadence and perform FPGA simulations',
                'Collaborate on AI algorithm development for aerospace applications',
                'Build MySQL databases for data management and analysis',
                'Analyze seismic data for structural design decisions'
            ],
            details: {
                achievements: [
                    '✓ Optimized satellite performance via parameter tuning (latitude, azimuth)',
                    '✓ Designed sequential circuits (Cadence) & FPGA simulations (Xilinx)',
                    '✓ AI algorithm development for aerospace (ML + satellite systems)',
                    '✓ Built MySQL databases for data management & analysis',
                    '✓ Analyzed seismic data for earthquake-resistant infrastructure design'
                ]
            }
        },
        {
            title: 'Summer Trainee',
            company: 'Egyptian Chemicals Holding Company (ECHEM)',
            location: 'ECHEM halls',
            date: 'Jul 2024 - Aug 2024',
            logo: 'assets/logos/echem_logo.png',
            preview: 'Comprehensive training in petrochemical industry operations and sustainability',
            responsibilities: [
                'Complete comprehensive training on petrochemical industry',
                'Analyze environmental impact assessments and sustainability practices',
                'Study organizational structure, subsidiaries, and product portfolios',
                'Learn industry value chains, production processes, and market dynamics',
                'Understand regulatory frameworks and safety standards'
            ],
            details: {
                achievements: [
                    '✓ Comprehensive petrochemical training (history, challenges, trends)',
                    '✓ Environmental impact & sustainability analysis',
                    '✓ ECHEM organizational structure & product portfolio expertise',
                    '✓ Industry value chains, production processes & market dynamics',
                    '✓ Regulatory frameworks & safety standards knowledge'
                ]
            }
        }
    ];

    // Education card flip functionality
    const educationCards = document.querySelectorAll('.education-card[data-card-type="education"]');
    educationCards.forEach(card => {
        const front = card.querySelector('.education-card-front');
        const back = card.querySelector('.education-card-back');
        
        // Set initial height based on front card
        if (front && back) {
            const updateCardHeight = () => {
                if (card.classList.contains('flipped')) {
                    card.style.minHeight = back.offsetHeight + 'px';
                } else {
                    card.style.minHeight = front.offsetHeight + 'px';
                }
            };
            
            // Set initial height
            updateCardHeight();
            
            // Update on resize
            window.addEventListener('resize', updateCardHeight);
            
            card.addEventListener('click', function() {
                this.classList.toggle('flipped');
                // Update height after flip animation
                setTimeout(updateCardHeight, 300);
            });
        } else {
            // Fallback if structure is different
            card.addEventListener('click', function() {
                this.classList.toggle('flipped');
            });
        }
    });

    // Experience card flip functionality
    const experienceCards = document.querySelectorAll('.experience-card[data-card-type="experience"]');
    experienceCards.forEach(card => {
        const front = card.querySelector('.experience-card-front');
        const back = card.querySelector('.experience-card-back');

        const updateCardHeight = () => {
            if (!front || !back) return;
            const targetHeight = card.classList.contains('flipped')
                ? back.offsetHeight
                : front.offsetHeight;
            card.style.minHeight = `${targetHeight}px`;
            card.style.height = `${targetHeight}px`;
        };

        updateCardHeight();
        window.addEventListener('resize', updateCardHeight);

        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
            setTimeout(updateCardHeight, 300);
        });
    });

    // Work History Carousel
    const workHistoryTrack = document.getElementById('work-history-track');
    const prevWorkHistoryBtn = document.getElementById('work-history-prev');
    const nextWorkHistoryBtn = document.getElementById('work-history-next');
    const pauseWorkHistoryBtn = document.getElementById('work-history-pause');
    const pauseIcon = document.getElementById('pause-icon');
    const positionIndicator = document.getElementById('work-history-position');
    const totalIndicator = document.getElementById('work-history-total');

    if (workHistoryTrack) {
        const AUTO_ROTATION_DELAY = 3000;
        let currentSlide = 0;
        let autoRotationInterval = null;
        let isPaused = false;
        let slides = [];
        let slideGap = 0;

        const pauseIconSVG = '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>';
        const playIconSVG = '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';

        function sanitizeText(text = '') {
            return text.replace(/✓/g, '').trim();
        }

        function buildHighlights(position) {
            const source = (position.details && position.details.achievements && position.details.achievements.length)
                ? position.details.achievements
                : (position.responsibilities || []);

            return source.slice(0, 3).map(item => sanitizeText(item));
        }

        function buildSlide(position, index) {
            const locationLabel = position.location ? `Inside ${position.location}` : `Inside ${position.company}`;
            
            // Show all responsibilities if available, otherwise show highlights
            let contentHTML = '';
            if (position.responsibilities && position.responsibilities.length > 0) {
                contentHTML = `<ul class="work-history-slide-points">${position.responsibilities.map(point => `<li>${sanitizeText(point)}</li>`).join('')}</ul>`;
            } else {
                const highlights = buildHighlights(position);
                if (highlights.length > 0) {
                    contentHTML = `<ul class="work-history-slide-points">${highlights.map(point => `<li>${point}</li>`).join('')}</ul>`;
                }
            }

            return `
                <article class="work-history-slide" role="group" aria-label="${locationLabel} slide ${index + 1} of ${workHistoryPositions.length}">
                    <div class="work-history-slide-media">
                        <img src="${position.logo}" alt="${position.company} logo" loading="lazy" onerror="this.style.display='none'">
                    </div>
                    <div class="work-history-slide-content">
                        <span class="work-history-slide-label">${locationLabel}</span>
                        ${contentHTML}
                    </div>
                </article>
            `;
        }

        function renderSlides() {
            const slidesMarkup = workHistoryPositions.map((position, index) => buildSlide(position, index)).join('');
            workHistoryTrack.innerHTML = slidesMarkup;
            slides = Array.from(workHistoryTrack.querySelectorAll('.work-history-slide'));
            slideGap = parseFloat(getComputedStyle(workHistoryTrack).columnGap || getComputedStyle(workHistoryTrack).gap || '0');
            if (totalIndicator) totalIndicator.textContent = slides.length;
            updateSlideState();
            updateTransform();
        }

        function updateSlideState() {
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentSlide);
            });
            if (positionIndicator) positionIndicator.textContent = currentSlide + 1;
        }

        function updateTransform() {
            if (!slides.length) return;
            const slideWidth = slides[0].getBoundingClientRect().width;
            const offset = currentSlide * (slideWidth + slideGap);
            workHistoryTrack.style.transform = `translateX(-${offset}px)`;
        }

        function goToSlide(index) {
            if (!slides.length) return;
            const total = slides.length;
            currentSlide = (index + total) % total;
            updateSlideState();
            updateTransform();
        }

        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        function prevSlide() {
            goToSlide(currentSlide - 1);
        }

        function startAutoRotation() {
            if (isPaused || slides.length <= 1) return;
            stopAutoRotation();
            autoRotationInterval = setInterval(nextSlide, AUTO_ROTATION_DELAY);
        }

        function stopAutoRotation() {
            if (autoRotationInterval) {
                clearInterval(autoRotationInterval);
                autoRotationInterval = null;
            }
        }

        function togglePause() {
            isPaused = !isPaused;
            if (pauseIcon) {
                pauseIcon.innerHTML = isPaused ? playIconSVG : pauseIconSVG;
            }
            if (pauseWorkHistoryBtn) {
                pauseWorkHistoryBtn.setAttribute('aria-label', isPaused ? 'Resume auto-rotation' : 'Pause auto-rotation');
            }
            if (isPaused) {
                stopAutoRotation();
            } else {
                startAutoRotation();
            }
        }

        // Event bindings
        if (prevWorkHistoryBtn) {
            prevWorkHistoryBtn.addEventListener('click', () => {
                prevSlide();
                if (!isPaused) {
                    stopAutoRotation();
                    startAutoRotation();
                }
            });
        }

        if (nextWorkHistoryBtn) {
            nextWorkHistoryBtn.addEventListener('click', () => {
                nextSlide();
                if (!isPaused) {
                    stopAutoRotation();
                    startAutoRotation();
                }
            });
        }

        if (pauseWorkHistoryBtn) {
            pauseWorkHistoryBtn.addEventListener('click', togglePause);
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            const section = document.querySelector('.work-history-carousel');
            if (!section) return;
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            if (!isVisible) return;

            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
            } else if (e.key === ' ') {
                e.preventDefault();
                togglePause();
            }
        });

        // Swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                if (!isPaused) {
                    stopAutoRotation();
                    startAutoRotation();
                }
            }
        }

        workHistoryTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        workHistoryTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        // Pause on hover/focus for accessibility
        const carouselWrapper = document.querySelector('.work-history-carousel');
        if (carouselWrapper) {
            carouselWrapper.addEventListener('mouseenter', () => {
                stopAutoRotation();
            });
            carouselWrapper.addEventListener('mouseleave', () => {
                if (!isPaused) startAutoRotation();
            });
            carouselWrapper.addEventListener('focusin', () => {
                stopAutoRotation();
            });
            carouselWrapper.addEventListener('focusout', () => {
                if (!isPaused) startAutoRotation();
            });
        }

        // Recalculate on resize
        window.addEventListener('resize', () => {
            slideGap = parseFloat(getComputedStyle(workHistoryTrack).columnGap || getComputedStyle(workHistoryTrack).gap || '0');
            updateTransform();
        });

        // Initialize
        renderSlides();
        startAutoRotation();
    }

    // Projects Carousel Functionality
    function initProjectsCarousel() {
        const carousel = document.querySelector('.projects-carousel');
        const track = document.getElementById('projects-carousel-track');
        const prevBtn = document.getElementById('projects-carousel-prev');
        const nextBtn = document.getElementById('projects-carousel-next');
        const indicatorsContainer = document.getElementById('projects-carousel-indicators');
        
        if (!carousel || !track) return;
        
        const projectContainers = track.querySelectorAll('.project-container');
        if (projectContainers.length === 0) return;
        
        let currentIndex = 0;
        let isPaused = false;
        let autoRotationInterval = null;
        const ROTATION_DELAY = 3000; // 3 seconds
        
        // Create indicators
        function createIndicators() {
            if (!indicatorsContainer) return;
            indicatorsContainer.innerHTML = '';
            projectContainers.forEach((_, index) => {
                const indicator = document.createElement('button');
                indicator.className = 'projects-carousel-indicator';
                indicator.setAttribute('role', 'tab');
                indicator.setAttribute('aria-label', `Go to project ${index + 1}`);
                indicator.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
                indicator.addEventListener('click', () => goToSlide(index));
                indicatorsContainer.appendChild(indicator);
            });
            updateIndicators();
        }
        
        // Update indicators
        function updateIndicators() {
            const indicators = indicatorsContainer?.querySelectorAll('.projects-carousel-indicator');
            if (!indicators) return;
            indicators.forEach((indicator, index) => {
                if (index === currentIndex) {
                    indicator.classList.add('active');
                    indicator.setAttribute('aria-selected', 'true');
                } else {
                    indicator.classList.remove('active');
                    indicator.setAttribute('aria-selected', 'false');
                }
            });
        }
        
        // Reset all card flips to front state
        function resetCardFlips() {
            projectContainers.forEach(container => {
                const card = container.querySelector('.card');
                if (card) {
                    card.classList.remove('flipped');
                }
            });
        }
        
        // Add click-to-flip functionality to cards
        function initCardFlipListeners() {
            projectContainers.forEach(container => {
                const card = container.querySelector('.card');
                if (!card) return;
                
                const front = card.querySelector('.card-front');
                const back = card.querySelector('.card-back');
                
                if (!front || !back) return;
                
                // Function to measure element height by temporarily cloning it with proper styles
                const measureElementHeight = (element) => {
                    // Get computed styles from original element
                    const computedStyle = window.getComputedStyle(element);
                    const cardWidth = card.getBoundingClientRect().width;
                    
                    // Clone the element
                    const clone = element.cloneNode(true);
                    
                    // Create a wrapper to position off-screen while keeping clone in normal flow
                    const wrapper = document.createElement('div');
                    wrapper.style.cssText = `
                        position: fixed !important;
                        top: -9999px !important;
                        left: -9999px !important;
                        width: ${cardWidth}px !important;
                        visibility: hidden !important;
                        pointer-events: none !important;
                    `;
                    
                    // Set up clone for measurement - use static positioning to allow natural height
                    clone.style.cssText = `
                        position: static !important;
                        visibility: visible !important;
                        width: 100% !important;
                        height: auto !important;
                        max-height: none !important;
                        min-height: auto !important;
                        overflow: visible !important;
                        opacity: 1 !important;
                        transform: none !important;
                        margin: 0 !important;
                        padding: ${computedStyle.paddingTop} ${computedStyle.paddingRight} ${computedStyle.paddingBottom} ${computedStyle.paddingLeft} !important;
                        box-sizing: ${computedStyle.boxSizing} !important;
                        display: ${computedStyle.display} !important;
                        flex-direction: ${computedStyle.flexDirection} !important;
                        gap: ${computedStyle.gap} !important;
                    `;
                    
                    // Add clone to wrapper, then wrapper to DOM
                    wrapper.appendChild(clone);
                    document.body.appendChild(wrapper);
                    
                    // Force reflow to ensure accurate measurement
                    void clone.offsetHeight;
                    
                    // Measure the actual content height
                    const height = clone.scrollHeight;
                    
                    // Remove wrapper (which contains clone)
                    document.body.removeChild(wrapper);
                    
                    return height;
                };
                
                // Function to measure and update card height based on visible side
                const updateCardHeight = () => {
                    try {
                        // Ensure card has a valid width before measuring
                        if (card.offsetWidth === 0) {
                            return; // Card not visible yet
                        }
                        
                        // Measure both sides
                        const frontHeight = measureElementHeight(front);
                        const backHeight = measureElementHeight(back);
                        
                        // Ensure we have valid measurements (at least 200px, reasonable max of 2000px)
                        const validFrontHeight = Math.max(200, Math.min(2000, frontHeight));
                        const validBackHeight = Math.max(200, Math.min(2000, backHeight));
                        
                        // Set card height based on which side is visible
                        const isFlipped = card.classList.contains('flipped');
                        const targetHeight = isFlipped ? validBackHeight : validFrontHeight;
                        
                        // Only update if the height is different to avoid unnecessary reflows
                        const currentHeight = parseInt(card.style.height) || card.offsetHeight;
                        if (Math.abs(currentHeight - targetHeight) > 5) {
                            card.style.height = `${targetHeight}px`;
                            card.style.minHeight = `${targetHeight}px`;
                        }
                    } catch (error) {
                        // Silently handle error - fallback to default height
                        // Error logged for debugging in development only
                        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                            console.warn('Error updating card height:', error);
                        }
                        // Fallback to default height if measurement fails
                        if (!card.style.height) {
                            card.style.height = '520px';
                            card.style.minHeight = '520px';
                        }
                    }
                };
                
                // Set initial height after content is loaded
                // Use requestAnimationFrame to ensure DOM is ready
                requestAnimationFrame(() => {
                    setTimeout(updateCardHeight, 200);
                });
                
                // Update on window resize with debouncing
                let resizeTimeout;
                const handleResize = () => {
                    clearTimeout(resizeTimeout);
                    resizeTimeout = setTimeout(() => {
                        requestAnimationFrame(updateCardHeight);
                    }, 150);
                };
                window.addEventListener('resize', handleResize);
                
                // Track if card is currently transitioning to prevent height updates during flip
                let isTransitioning = false;
                
                // Add click listener with height update
                card.addEventListener('click', (e) => {
                    // Don't flip if clicking on buttons or links
                    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('button') || e.target.closest('a')) {
                        return;
                    }
                    
                    // Prevent multiple rapid clicks during transition
                    if (isTransitioning) {
                        return;
                    }
                    
                    // Toggle flip state - CSS handles the transform
                    const wasFlipped = card.classList.contains('flipped');
                    card.classList.toggle('flipped');
                    const isFlipped = card.classList.contains('flipped');
                    
                    // Mark as transitioning
                    isTransitioning = true;
                    
                    // Update height after flip animation completes
                    // Transition is 0.6s (600ms), wait for it to complete plus a buffer
                    // Use longer delay to ensure all CSS transitions and reflows are complete
                    setTimeout(() => {
                        // Double-check the flip state hasn't changed
                        if (card.classList.contains('flipped') === isFlipped) {
                            requestAnimationFrame(() => {
                                // Wait one more frame to ensure DOM is stable
                                requestAnimationFrame(() => {
                                    // Only update if not transitioning (safety check)
                                    if (!isTransitioning || card.classList.contains('flipped') === isFlipped) {
                                        updateCardHeight();
                                    }
                                    // Clear transitioning flag
                                    isTransitioning = false;
                                });
                            });
                        } else {
                            // State changed, clear flag
                            isTransitioning = false;
                        }
                    }, 700);
                });
            });
        }
        
        // Go to specific slide
        function goToSlide(index) {
            if (index < 0) index = projectContainers.length - 1;
            if (index >= projectContainers.length) index = 0;
            
            // Reset all cards to front state before sliding
            resetCardFlips();
            
            currentIndex = index;
            const translateX = -currentIndex * 100;
            track.style.transform = `translateX(${translateX}%)`;
            updateIndicators();
            
            // Update ARIA live region
            const ariaLiveRegion = document.getElementById('projects-aria-live');
            if (ariaLiveRegion) {
                const projectTitle = projectContainers[currentIndex].querySelector('h3')?.textContent || '';
                ariaLiveRegion.textContent = `Showing project ${currentIndex + 1} of ${projectContainers.length}: ${projectTitle}`;
            }
        }
        
        // Next slide
        function nextSlide() {
            goToSlide(currentIndex + 1);
        }
        
        // Previous slide
        function prevSlide() {
            goToSlide(currentIndex - 1);
        }
        
        // Start auto-rotation
        function startAutoRotation() {
            if (isPaused || projectContainers.length <= 1) return;
            stopAutoRotation();
            autoRotationInterval = setInterval(nextSlide, ROTATION_DELAY);
        }
        
        // Stop auto-rotation
        function stopAutoRotation() {
            if (autoRotationInterval) {
                clearInterval(autoRotationInterval);
                autoRotationInterval = null;
            }
        }
        
        // Pause on hover
        carousel.addEventListener('mouseenter', () => {
            isPaused = true;
            stopAutoRotation();
        });
        
        // Resume on mouse leave
        carousel.addEventListener('mouseleave', () => {
            isPaused = false;
            startAutoRotation();
        });
        
        // Navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                if (!isPaused) {
                    stopAutoRotation();
                    startAutoRotation();
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                if (!isPaused) {
                    stopAutoRotation();
                    startAutoRotation();
                }
            });
        }
        
        // Initialize
        createIndicators();
        initCardFlipListeners();
        goToSlide(0);
        
        // Start auto-rotation after a short delay
        setTimeout(() => {
            startAutoRotation();
        }, 1000);
        
        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                goToSlide(currentIndex); // Recalculate position
            }, 100);
        });
    }
    
    // Initialize carousel when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProjectsCarousel);
    } else {
        initProjectsCarousel();
    }
    
    // Image error handling - graceful fallback
    document.addEventListener('error', (e) => {
        if (e.target.tagName === 'IMG') {
            e.target.style.opacity = '0.5';
            e.target.alt = e.target.alt || 'Image failed to load';
            // Add error class for styling
            e.target.classList.add('image-error');
        }
    }, true);
    
    // Define filterProjects function for projects search/filtering
    window.filterProjects = function(filter, searchQuery) {
        // Projects filtering logic - can be enhanced based on needs
        const projectContainers = document.querySelectorAll('.project-container');
        projectContainers.forEach(container => {
            let shouldShow = true;
            
            if (searchQuery) {
                const projectText = container.textContent.toLowerCase();
                shouldShow = projectText.includes(searchQuery.toLowerCase());
            }
            
            container.style.display = shouldShow ? 'block' : 'none';
        });
    };
    
    // Initialize with default filter (all projects)
    const activeFilter = 'all';
    filterProjects(activeFilter);
    
    // Make skills clickable to filter projects
    const skillContainers = document.querySelectorAll('.skill-container[data-skill-filter]');
    const projectsSearch = document.getElementById('projects-search') || document.querySelector('#projects input[type="search"]');
    
    skillContainers.forEach(skill => {
        skill.addEventListener('click', function() {
            const skillFilter = (this.getAttribute('data-skill-filter') || '').trim();
            const fallbackLabel = this.querySelector('.skill-name .h3')?.textContent?.trim().toLowerCase().split(' ')[0] || '';
            const searchValue = skillFilter || fallbackLabel;
            // Scroll to projects section
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            // Set search query to filter by skill (if search input exists)
            if (projectsSearch && searchValue) {
                projectsSearch.value = searchValue;
                filterProjects('all', searchValue);
            } else if (searchValue) {
                // If no search input, just filter directly
                filterProjects('all', searchValue);
            }
        });
    });
});

// Globe Initialization with Intersection Observer for lazy loading
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('globe-canvas');
    const globeWrapper = document.querySelector('.globe-wrapper');
    if (!canvas || !globeWrapper) {
        return; // Exit if canvas or wrapper not available
    }
    
    let globe = null;
    let isInitialized = false;
    const MOVEMENT_DAMPING = 1400;
    
    function getCobeLibrary() {
        // Try different ways cobe might be exposed from CDN
        if (window.cobe && window.cobe.createGlobe) {
            return window.cobe;
        }
        if (window.createGlobe) {
            return { createGlobe: window.createGlobe };
        }
        // Check if loaded as module
        if (typeof cobe !== 'undefined' && cobe.createGlobe) {
            return cobe;
        }
        return null;
    }
    
    function initGlobe() {
        if (isInitialized) return;
        
        // Wait for cobe library to be available
        let retryCount = 0;
        const maxRetries = 100; // Increased retries
        
        const tryInit = () => {
            retryCount++;
            if (retryCount > maxRetries) {
                // Cobe library failed to load after maximum retries
                // Show canvas with fallback styling if library fails to load
                if (canvas) {
                    canvas.style.opacity = '0.3';
                    canvas.style.visibility = 'visible';
                }
                return;
            }
            
            const cobeLib = getCobeLibrary();
            if (!cobeLib || !cobeLib.createGlobe) {
                setTimeout(tryInit, 100);
                return;
            }
            
            // Cobe library loaded successfully, initializing globe
            
            isInitialized = true;
            
            const phiRef = { current: 0 };
            const widthRef = { current: 0 };
            const pointerInteracting = { current: null };
            const pointerInteractionMovement = { current: 0 };
            let r = 0; // Rotation value for smooth interaction

            const updatePointerInteraction = (value) => {
                pointerInteracting.current = value;
                if (canvas) {
                    canvas.style.cursor = value !== null ? 'grabbing' : 'grab';
                }
            };

            const updateMovement = (clientX) => {
                if (pointerInteracting.current !== null) {
                    const delta = clientX - pointerInteracting.current;
                    pointerInteractionMovement.current = delta;
                    r += delta / MOVEMENT_DAMPING;
                }
            };

            const onResize = () => {
                if (canvas) {
                    const newWidth = canvas.offsetWidth || 400;
                    if (newWidth > 0 && newWidth !== widthRef.current) {
                        widthRef.current = newWidth;
                        const canvasWidth = widthRef.current * 2;
                        const canvasHeight = widthRef.current * 2;
                        canvas.width = canvasWidth;
                        canvas.height = canvasHeight;
                    }
                }
            };

            window.addEventListener('resize', onResize);
            
            // Get initial width - ensure we have dimensions
            // Wait a bit for layout to settle
            const initializeDimensions = () => {
                // Force a layout calculation by checking multiple times
                widthRef.current = canvas.offsetWidth || globeWrapper.offsetWidth || 400;
                
                if (widthRef.current === 0) {
                    // Force a layout calculation
                    canvas.style.display = 'block';
                    canvas.style.width = '100%';
                    canvas.style.height = 'auto';
                    // Trigger reflow
                    void canvas.offsetWidth;
                    widthRef.current = canvas.offsetWidth || globeWrapper.offsetWidth || 400;
                }
                
                // Ensure minimum width
                if (widthRef.current < 300) {
                    widthRef.current = 300;
                }
                
                // Ensure maximum width for performance
                if (widthRef.current > 500) {
                    widthRef.current = 500;
                }
                
                // Set canvas internal dimensions (important for rendering)
                const canvasWidth = widthRef.current * 2;
                const canvasHeight = widthRef.current * 2;
                canvas.width = canvasWidth;
                canvas.height = canvasHeight;
                
                // Verify dimensions were set
                if (canvas.width === 0 || canvas.height === 0) {
                    // Canvas dimensions are zero, retrying
                    setTimeout(initializeDimensions, 100);
                    return;
                }
                
                // Now create the globe with proper dimensions
                createGlobeInstance();
            };
            
            // Try multiple times to ensure layout is ready
            setTimeout(initializeDimensions, 50);
            setTimeout(initializeDimensions, 200);
            setTimeout(initializeDimensions, 500);
            
            function createGlobeInstance() {
                const canvasWidth = widthRef.current * 2;
                const canvasHeight = widthRef.current * 2;

                // Verify canvas has valid dimensions
                if (canvasWidth === 0 || canvasHeight === 0) {
                    // Invalid canvas dimensions
                    return;
                }

                // Location markers: [latitude, longitude]
                const markers = [
                    { location: [30.0444, 31.2357], size: 0.1 }, // Cairo, Egypt (base location)
                    { location: [52.5200, 13.4050], size: 0.08 }, // Berlin, Germany
                    { location: [40.7128, -74.0060], size: 0.1 }, // New York, USA
                    { location: [35.6762, 139.6503], size: 0.08 }, // Tokyo, Japan
                    { location: [51.5074, -0.1278], size: 0.07 }, // London, UK
                    { location: [48.8566, 2.3522], size: 0.07 }, // Paris, France
                    { location: [25.2048, 55.2708], size: 0.06 }, // Dubai, UAE
                    { location: [19.4326, -99.1332], size: 0.06 }, // Mexico City
                    { location: [-23.5505, -46.6333], size: 0.06 }, // São Paulo, Brazil
                    { location: [34.6937, 135.5022], size: 0.05 }, // Osaka, Japan
                ];

                try {
                    globe = cobeLib.createGlobe(canvas, {
                        devicePixelRatio: 2,
                        width: canvasWidth,
                        height: canvasHeight,
                        phi: 0,
                        theta: 0.3,
                        dark: 0,
                        diffuse: 0.4,
                        mapSamples: 16000,
                        mapBrightness: 1.2,
                        baseColor: [0.85, 0.85, 0.85],
                        markerColor: [0.85, 0.55, 0.15], // Orange/amber color
                        glowColor: [0.9, 0.9, 0.9],
                        markers: markers,
                        onRender: (state) => {
                            if (!pointerInteracting.current) {
                                phiRef.current += 0.005;
                            }
                            state.phi = phiRef.current + r;
                            state.width = canvasWidth;
                            state.height = canvasHeight;
                        }
                    });

                    // Globe created successfully
                    
                    // Make canvas visible immediately after globe creation
                    if (canvas) {
                        canvas.style.opacity = '1';
                        canvas.style.visibility = 'visible';
                    }
                    
                    // Pointer event handlers
                    canvas.addEventListener('pointerdown', (e) => {
                        pointerInteracting.current = e.clientX;
                        updatePointerInteraction(e.clientX);
                    });

                    canvas.addEventListener('pointerup', () => {
                        updatePointerInteraction(null);
                    });

                    canvas.addEventListener('pointerout', () => {
                        updatePointerInteraction(null);
                    });

                    canvas.addEventListener('mousemove', (e) => {
                        updateMovement(e.clientX);
                    });

                    canvas.addEventListener('touchmove', (e) => {
                        if (e.touches[0]) {
                            updateMovement(e.touches[0].clientX);
                        }
                    });

                    // Cleanup on page unload
                    window.addEventListener('beforeunload', () => {
                        if (globe && globe.destroy) {
                            globe.destroy();
                        }
                        window.removeEventListener('resize', onResize);
                    });
                } catch (error) {
                    // Error creating globe
                    // Show canvas with reduced opacity as fallback
                    if (canvas) {
                        canvas.style.opacity = '0.2';
                        canvas.style.visibility = 'visible';
                    }
                    return;
                }
            }
        };
        
        tryInit();
    }
    
    // Use Intersection Observer to lazy-load globe when it enters viewport
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isInitialized) {
                    initGlobe();
                    observer.disconnect(); // Only initialize once
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the component is visible
        });
        
        observer.observe(globeWrapper);
    } else {
        // Fallback for browsers without IntersectionObserver
        initGlobe();
    }
    
    // Also try to initialize immediately if already in viewport
    const checkIfInViewport = () => {
        const rect = globeWrapper.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible && !isInitialized) {
            initGlobe();
        }
    };
    
    // Check immediately and after delays to ensure initialization
    checkIfInViewport();
    setTimeout(checkIfInViewport, 100);
    setTimeout(checkIfInViewport, 500);
    setTimeout(checkIfInViewport, 1000);
});

// HR Summary Carousel - Auto-rotating with hover pause
function initHRSummaryCarousel() {
    const carousel = document.getElementById('hr-summary-carousel');
    const track = document.getElementById('hr-summary-carousel-track');
    
    if (!carousel || !track) return;
    
    const items = track.querySelectorAll('.hr-summary-item');
    if (items.length === 0) return;
    
    let currentIndex = 0;
    let isPaused = false;
    let rotationInterval = null;
    const rotationDuration = 4500; // 4.5 seconds between rotations
    const transitionDuration = 800; // 0.8s transition time
    
    // Function to move to next card
    function moveToNext() {
        if (isPaused) return;
        
        currentIndex = (currentIndex + 1) % items.length;
        const translateX = -currentIndex * 100;
        track.style.transform = `translateX(${translateX}%)`;
    }
    
    // Start auto-rotation
    function startRotation() {
        if (rotationInterval) clearInterval(rotationInterval);
        rotationInterval = setInterval(moveToNext, rotationDuration);
    }
    
    // Pause rotation
    function pauseRotation() {
        isPaused = true;
        if (rotationInterval) {
            clearInterval(rotationInterval);
            rotationInterval = null;
        }
    }
    
    // Resume rotation
    function resumeRotation() {
        isPaused = false;
        // Wait a moment before resuming to ensure smooth transition
        setTimeout(() => {
            if (!isPaused) {
                startRotation();
            }
        }, 100);
    }
    
    // Initialize: show first card
    track.style.transform = 'translateX(0%)';
    
    // Start rotation after a short delay
    setTimeout(startRotation, 1000);
    
    // Add hover event listeners - pause when mouse enters carousel or any item
    carousel.addEventListener('mouseenter', pauseRotation);
    carousel.addEventListener('mouseleave', resumeRotation);
    
    // Pause on individual item hover - this ensures pause when hovering over the current card
    items.forEach(item => {
        item.addEventListener('mouseenter', () => {
            pauseRotation();
        });
        item.addEventListener('mouseleave', () => {
            // Only resume if mouse is not over carousel or any item
            setTimeout(() => {
                const isOverCarousel = carousel.matches(':hover');
                const isOverAnyItem = Array.from(items).some(item => item.matches(':hover'));
                if (!isOverCarousel && !isOverAnyItem) {
                    resumeRotation();
                }
            }, 50);
        });
    });
}

// Initialize carousel when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHRSummaryCarousel);
} else {
    initHRSummaryCarousel();
}


