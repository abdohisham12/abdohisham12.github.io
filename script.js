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
        animateNumber(statNumbers[currentIndex]);
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
    
    window.addEventListener('scroll', () => {
        toggleSidebar();
        updateActiveLink();
    });
    
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
    
    skillContainers.forEach(container => {
        const skillName = container.querySelector('.skill-name .h3')?.textContent || '';
        const projects = {
            'TensorFlow': 'SIRB, Ionospheric Forecasting, Microsoft Malware Detection',
            'Python': 'All projects - Core language for AI/ML development',
            'LLM Technologies': 'Autonomous Mission Design (RAG)',
            'RAG': 'Autonomous Mission Design - Graduation Project',
            'Computer Vision': 'SIRB Project - 95%+ accuracy',
            'PyTorch': 'Autonomous Mission Design',
            'Microsoft Azure': 'CDF Project - Cloud deployment',
            'MLflow': 'Microsoft Malware Detection - MLOps'
        };
        
        const projectList = projects[skillName.split(' ')[0]] || 'Multiple projects';
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'skill-tooltip';
        tooltip.textContent = `Used in: ${projectList}`;
        container.appendChild(tooltip);
        
        // Show/hide tooltip on hover
        container.addEventListener('mouseenter', () => {
            tooltip.classList.add('visible');
        });
        
        container.addEventListener('mouseleave', () => {
            tooltip.classList.remove('visible');
        });
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

// Update active nav link on scroll
window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// Scroll Progress Indicator
document.addEventListener('DOMContentLoaded', () => {
    const scrollProgress = document.getElementById('scroll-progress');
    
    if (scrollProgress) {
        function updateScrollProgress() {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            scrollProgress.style.width = scrolled + '%';
            scrollProgress.setAttribute('aria-valuenow', Math.round(scrolled));
        }
        
        window.addEventListener('scroll', updateScrollProgress);
        updateScrollProgress();
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
        
        window.addEventListener('scroll', toggleBackToTop);
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
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            
            heroShapes.forEach((shape, index) => {
                const speed = 0.3 + (index * 0.1);
                shape.style.transform = `translateY(${rate * speed}px)`;
            });
        });
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
    console.warn('IntersectionObserver not supported');
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

// Contact Form Handling
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
        console.warn('Contact form elements not found');
        return;
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

    // Form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

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
                        console.warn('Could not parse response as JSON, assuming success');
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
            console.error('Error sending message:', error);
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
            title: 'Space Environment Trainee',
            company: 'Egyptian Space Agency (EgSA)',
            date: 'Aug 2024 - Sep 2024',
            logo: 'assets/logos/egsa_logo.png',
            preview: '87% accuracy in predicting ionospheric disturbances using LSTM/GRU deep learning model',
            responsibilities: [
                'Develop deep learning models for space-weather prediction',
                'Process and analyze large-scale space environment data',
                'Implement LSTM/GRU architectures with attention mechanisms',
                'Complete intensive training on space environment and space weather'
            ],
            details: {
                achievements: [
                    '✓ <strong>87% accuracy</strong> predicting ionospheric disturbances (LSTM/GRU)',
                    '✓ Processed <strong>50K+ data points</strong> for space-weather models',
                    '✓ Completed 2-week intensive training on space environment & weather'
                ]
            }
        },
        {
            title: 'Space Keys Trainee',
            company: 'Egyptian Space Agency (EgSA)',
            date: 'Jan 2024 - Feb 2024',
            logo: 'assets/logos/egsa_logo.png',
            preview: 'Comprehensive understanding of satellite subsystems and integration procedures',
            responsibilities: [
                'Study satellite subsystems (power, OBC, communication, payload, ADCS, structural)',
                'Participate in hands-on satellite integration and testing procedures',
                'Learn end-to-end satellite development lifecycle',
                'Complete Space Keys educational program'
            ],
            details: {
                achievements: [
                    '✓ Mastered satellite subsystems (power, OBC, comms, payload, ADCS)',
                    '✓ Hands-on satellite integration & testing experience',
                    '✓ End-to-end satellite development lifecycle knowledge'
                ]
            }
        },
        {
            title: 'IT Engineer Trainee',
            company: 'EGYPTAIR TRAINING ACADEMY',
            date: 'Aug 2023 - Sep 2023',
            logo: 'assets/logos/egyair_logo.png',
            preview: 'Designed and implemented secure VPN tunnel architecture and VoIP solutions',
            responsibilities: [
                'Design and implement secure VPN tunnel architecture using Hyper-V',
                'Develop VoIP telephone service solutions for enterprise communication',
                'Conduct network security simulations and vulnerability assessments',
                'Learn aviation industry systems (Jeppesen, SITA protocols)'
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
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });

    // Experience card flip functionality
    const experienceCards = document.querySelectorAll('.experience-card[data-card-type="experience"]');
    experienceCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });

    // Work History Auto-Rotation
    const workHistoryCard = document.querySelector('.work-history-card[data-card-type="work-history"]');
    const workHistoryCardFront = document.querySelector('.work-history-card-front');
    const workHistoryCardBack = document.querySelector('.work-history-card-details');

    if (workHistoryCard && workHistoryCardFront && workHistoryCardBack) {
        let currentIndex = 0;
        let autoRotationInterval = null;
        let visualHintInterval = null;
        let isCardFlipped = false;

        // Function to update work history card content
        function updateWorkHistoryCard(index) {
            const position = workHistoryPositions[index];
            if (!position) return;

            // Update front face with responsibilities
            let responsibilitiesHTML = '';
            if (position.responsibilities && position.responsibilities.length > 0) {
                responsibilitiesHTML = '<div class="work-history-responsibilities"><h4 style="color: #0092CC; margin-bottom: 15px; font-size: 1.2em;">Key Responsibilities:</h4><ul style="list-style: none; padding: 0; line-height: 1.8;">';
                position.responsibilities.forEach(resp => {
                    responsibilitiesHTML += `<li>${resp}</li>`;
                });
                responsibilitiesHTML += '</ul></div>';
            }
            
            workHistoryCardFront.innerHTML = `
                <div class="work-history-card-header">
                    <img src="${position.logo}" alt="${position.company} Logo" class="work-history-logo" onerror="this.style.display='none'">
                    <div class="work-history-title">
                        <h4>Inside ${position.company}</h4>
                    </div>
                </div>
                <div class="work-history-date">${position.date}</div>
                ${responsibilitiesHTML}
            `;

            // Update back face
            let detailsHTML = `<h3>Inside ${position.company}</h3>`;
            if (position.details.achievements) {
                detailsHTML += '<p><strong>Key Achievements:</strong></p><ul style="list-style: none; padding: 0; line-height: 1.8;">';
                position.details.achievements.forEach(achievement => {
                    // Remove checkmark emoji (✓) from achievement text (anywhere in the string)
                    const cleanAchievement = achievement.replace(/✓/g, '').trim();
                    detailsHTML += `<li>${cleanAchievement}</li>`;
                });
                detailsHTML += '</ul>';
            }
            if (position.details.projects) {
                detailsHTML += '<p><strong>Key Projects:</strong></p><ul style="list-style: none; padding: 0; line-height: 1.8;">';
                position.details.projects.forEach(project => {
                    // Remove checkmark emoji (✓) from project text if present
                    const cleanProject = project.replace(/✓/g, '').trim();
                    detailsHTML += `<li>${cleanProject}</li>`;
                });
                detailsHTML += '</ul>';
            }
            workHistoryCardBack.innerHTML = detailsHTML;
        }

        // Function to move to next position
        function nextPosition() {
            if (isCardFlipped) return; // Don't rotate if card is flipped
            currentIndex = (currentIndex + 1) % workHistoryPositions.length;
            updateWorkHistoryCard(currentIndex);
            updatePositionIndicator();
        }

        // Function to move to previous position
        function prevPosition() {
            if (isCardFlipped) return;
            currentIndex = (currentIndex - 1 + workHistoryPositions.length) % workHistoryPositions.length;
            updateWorkHistoryCard(currentIndex);
            updatePositionIndicator();
        }

        // Function to update position indicator
        function updatePositionIndicator() {
            const positionEl = document.getElementById('work-history-position');
            const totalEl = document.getElementById('work-history-total');
            if (positionEl) positionEl.textContent = currentIndex + 1;
            if (totalEl) totalEl.textContent = workHistoryPositions.length;
        }

        // Navigation controls
        const prevBtn = document.getElementById('work-history-prev');
        const nextBtn = document.getElementById('work-history-next');
        const pauseBtn = document.getElementById('work-history-pause');
        const pauseIcon = document.getElementById('pause-icon');
        let isPaused = false;

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevPosition();
                if (!isPaused) {
                    stopAutoRotation();
                    startAutoRotation();
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextPosition();
                if (!isPaused) {
                    stopAutoRotation();
                    startAutoRotation();
                }
            });
        }

        if (pauseBtn && pauseIcon) {
            // SVG icons for pause and play
            const pauseIconSVG = '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>';
            const playIconSVG = '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
            
            pauseBtn.addEventListener('click', () => {
                isPaused = !isPaused;
                if (isPaused) {
                    stopAutoRotation();
                    pauseIcon.innerHTML = playIconSVG;
                    pauseBtn.setAttribute('aria-label', 'Resume auto-rotation');
                } else {
                    startAutoRotation();
                    pauseIcon.innerHTML = pauseIconSVG;
                    pauseBtn.setAttribute('aria-label', 'Pause auto-rotation');
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            const workHistorySection = document.querySelector('.work-history-section, .experience-section');
            if (!workHistorySection) return;
            
            const rect = workHistorySection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !isCardFlipped) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    prevPosition();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    nextPosition();
                } else if (e.key === ' ') {
                    e.preventDefault();
                    if (pauseBtn) pauseBtn.click();
                }
            }
        });

        // Initialize position indicator
        updatePositionIndicator();
        
        // Swipe gesture support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        if (workHistoryCard) {
            workHistoryCard.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            workHistoryCard.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });
            
            function handleSwipe() {
                if (isCardFlipped) return;
                const swipeThreshold = 50;
                const diff = touchStartX - touchEndX;
                
                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        // Swipe left - next
                        nextPosition();
                    } else {
                        // Swipe right - previous
                        prevPosition();
                    }
                    if (!isPaused) {
                        stopAutoRotation();
                        startAutoRotation();
                    }
                }
            }
        }

        // Function to start auto-rotation
        function startAutoRotation() {
            if (isPaused) return;
            if (autoRotationInterval) clearInterval(autoRotationInterval);
            autoRotationInterval = setInterval(nextPosition, 1500); // 1.5 seconds for better readability
        }

        // Function to stop auto-rotation
        function stopAutoRotation() {
            if (autoRotationInterval) {
                clearInterval(autoRotationInterval);
                autoRotationInterval = null;
            }
        }

        // Function to show visual hint on random card
        function showVisualHint() {
            if (isCardFlipped) return; // Don't show hint if card is flipped
            
            // Show hint on work history card
            workHistoryCard.classList.add('hint-pulse');
            setTimeout(() => {
                workHistoryCard.classList.remove('hint-pulse');
            }, 1000);

            // Also show hint on random education card
            if (educationCards.length > 0) {
                const randomCard = educationCards[Math.floor(Math.random() * educationCards.length)];
                randomCard.classList.add('hint-pulse');
                setTimeout(() => {
                    randomCard.classList.remove('hint-pulse');
                }, 1000);
            }
        }

        // Function to start visual hints
        function startVisualHints() {
            if (visualHintInterval) clearInterval(visualHintInterval);
            visualHintInterval = setInterval(showVisualHint, 5000); // 5 seconds
        }

        // Card flip handler
        workHistoryCard.addEventListener('click', function() {
            isCardFlipped = !isCardFlipped;
            this.classList.toggle('flipped');
            
            if (isCardFlipped) {
                stopAutoRotation();
            } else {
                startAutoRotation();
            }
        });


        // Initialize
        updateWorkHistoryCard(currentIndex);
        startAutoRotation();
        startVisualHints();

        // Pause rotation when user is not viewing the section
        const workHistorySection = document.querySelector('.work-history-subsection');
        if (workHistorySection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !isCardFlipped) {
                        startAutoRotation();
                    } else {
                        stopAutoRotation();
                    }
                });
            }, { threshold: 0.3 });

            observer.observe(workHistorySection);
        }
    }

    // Projects Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectRow = document.querySelector('.project-row');
    const projectContainers = document.querySelectorAll('.project-container');
    const projectsSearch = document.getElementById('projects-search');
    const projectsCountNumber = document.getElementById('projects-count-number');
    let activeFilter = 'all'; // Default to all projects
    let searchQuery = '';

    function updateProjectsCount() {
        const visibleCount = Array.from(projectContainers).filter(container => 
            !container.classList.contains('filtered-out')
        ).length;
        if (projectsCountNumber) {
            projectsCountNumber.textContent = visibleCount;
        }
    }

    function filterProjects(filterType, searchText = '') {
        activeFilter = filterType;
        searchQuery = searchText.toLowerCase();
        
        // Update active button state
        filterButtons.forEach(btn => {
            if (btn.getAttribute('data-filter') === filterType) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Separate visible and hidden projects
        const visibleProjects = [];
        const hiddenProjects = [];
        
        projectContainers.forEach(container => {
            const projectType = container.getAttribute('data-project-type');
            const projectTitle = container.querySelector('h3')?.textContent.toLowerCase() || '';
            const projectDescription = container.querySelector('.p')?.textContent.toLowerCase() || '';
            const projectText = projectTitle + ' ' + projectDescription;
            
            let shouldShow = false;
            
            // Type filter
            if (filterType === 'all') {
                shouldShow = true;
            } else if (projectType === filterType) {
                shouldShow = true;
            }
            
            // Search filter
            if (shouldShow && searchQuery) {
                shouldShow = projectText.includes(searchQuery);
            }
            
            if (shouldShow) {
                container.classList.remove('filtered-out');
                visibleProjects.push(container);
            } else {
                container.classList.add('filtered-out');
                hiddenProjects.push(container);
            }
        });

        // Reorder projects: visible first, then hidden
        if (projectRow) {
            // Add reordering class for smooth transition
            projectRow.classList.add('reordering');
            
            // Use DocumentFragment for efficient DOM manipulation
            const fragment = document.createDocumentFragment();
            
            // Add visible projects first
            visibleProjects.forEach(project => {
                fragment.appendChild(project);
            });
            
            // Add hidden projects at the end
            hiddenProjects.forEach(project => {
                fragment.appendChild(project);
            });
            
            // Clear and repopulate the container
            projectRow.innerHTML = '';
            projectRow.appendChild(fragment);
            
            // Use requestAnimationFrame to ensure smooth reflow
            requestAnimationFrame(() => {
                // Trigger reflow for smooth animation
                projectRow.offsetHeight;
                
                // Animate visible projects in with stagger effect
                visibleProjects.forEach((project, index) => {
                    // Reset any inline styles first
                    project.style.opacity = '0';
                    project.style.transform = 'translateY(20px)';
                    
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            project.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                            project.style.opacity = '1';
                            project.style.transform = 'translateY(0)';
                        }, index * 30); // Stagger animation
                    });
                });
                
                // Clean up after animation completes
                const animationDuration = visibleProjects.length * 30 + 300;
                setTimeout(() => {
                    projectRow.classList.remove('reordering');
                    visibleProjects.forEach(project => {
                        project.style.transition = '';
                        project.style.opacity = '';
                        project.style.transform = '';
                    });
                }, animationDuration);
            });
        }

        // Update count
        if (projectsCountNumber) {
            projectsCountNumber.textContent = visibleProjects.length;
        }
    }

    // Add click handlers to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterType = this.getAttribute('data-filter');
            filterProjects(filterType, searchQuery);
        });
    });

    // Add search functionality
    if (projectsSearch) {
        projectsSearch.addEventListener('input', function() {
            const searchText = this.value;
            filterProjects(activeFilter, searchText);
        });
    }

    // Initialize with default filter (all projects)
    filterProjects(activeFilter);
    
    // Make skills clickable to filter projects
    const skillContainers = document.querySelectorAll('.skill-container[data-skill-filter]');
    skillContainers.forEach(skill => {
        skill.addEventListener('click', function() {
            const skillFilter = this.getAttribute('data-skill-filter');
            // Scroll to projects section
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            // Set search query to filter by skill
            if (projectsSearch) {
                projectsSearch.value = skillFilter;
                filterProjects('all', skillFilter);
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
            console.log('Cobe library found via window.cobe');
            return window.cobe;
        }
        if (window.createGlobe) {
            console.log('Cobe library found via window.createGlobe');
            return { createGlobe: window.createGlobe };
        }
        // Check if loaded as module
        if (typeof cobe !== 'undefined' && cobe.createGlobe) {
            console.log('Cobe library found via module');
            return cobe;
        }
        console.warn('Cobe library not found');
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
                console.warn('Cobe library failed to load after maximum retries');
                // Show canvas with fallback styling if library fails to load
                if (canvas) {
                    canvas.style.opacity = '0.3';
                    canvas.style.visibility = 'visible';
                    console.warn('Globe canvas set to fallback visibility');
                }
                return;
            }
            
            const cobeLib = getCobeLibrary();
            if (!cobeLib || !cobeLib.createGlobe) {
                if (retryCount % 10 === 0) {
                    console.log(`Waiting for cobe library... (attempt ${retryCount}/${maxRetries})`);
                }
                setTimeout(tryInit, 100);
                return;
            }
            
            console.log('Cobe library loaded successfully, initializing globe...');
            
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
                
                console.log(`Canvas dimensions set: ${widthRef.current}px`);
                
                // Set canvas internal dimensions (important for rendering)
                const canvasWidth = widthRef.current * 2;
                const canvasHeight = widthRef.current * 2;
                canvas.width = canvasWidth;
                canvas.height = canvasHeight;
                
                // Verify dimensions were set
                if (canvas.width === 0 || canvas.height === 0) {
                    console.error('Canvas dimensions are zero, retrying...');
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
                    console.error('Invalid canvas dimensions:', canvasWidth, canvasHeight);
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
                    console.log(`Creating globe with dimensions: ${canvasWidth}x${canvasHeight}`);
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

                    console.log('Globe created successfully');
                    
                    // Make canvas visible immediately after globe creation
                    if (canvas) {
                        canvas.style.opacity = '1';
                        canvas.style.visibility = 'visible';
                        console.log('Canvas made visible');
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
                    console.error('Error creating globe:', error);
                    console.error('Error details:', {
                        message: error.message,
                        stack: error.stack,
                        canvasWidth: canvasWidth,
                        canvasHeight: canvasHeight,
                        canvasExists: !!canvas
                    });
                    // Show canvas with reduced opacity as fallback
                    if (canvas) {
                        canvas.style.opacity = '0.2';
                        canvas.style.visibility = 'visible';
                        console.warn('Globe failed to initialize, showing fallback');
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


