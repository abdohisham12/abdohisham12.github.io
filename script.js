// Note: Download CV button now uses direct link, no JS needed

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

// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
            const isExpanded = hamburgerMenu.classList.contains('active');
            hamburgerMenu.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close menu when clicking on a nav link
        const navLinkElements = navLinks.querySelectorAll('.nav-link');
        navLinkElements.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
                hamburgerMenu.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburgerMenu.contains(e.target) && !navLinks.contains(e.target)) {
                hamburgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
                hamburgerMenu.setAttribute('aria-expanded', 'false');
            }
        });
    }
});

// Hero Landing Animations
function initHeroAnimations() {
    const heroElements = document.querySelectorAll('.animate-fade-in-up, .animate-scale-in');
    
    heroElements.forEach((element) => {
        const delay = element.getAttribute('data-delay') || '0s';
        element.style.animationDelay = delay;
        
        // Trigger animation
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = element.classList.contains('animate-scale-in') 
                ? 'scale(1)' 
                : 'translateY(0)';
        }, parseFloat(delay) * 1000);
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
