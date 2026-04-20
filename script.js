// ==================== MOBILE MENU FUNCTIONALITY ====================
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// ==================== NAVBAR SCROLL EFFECT ====================
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==================== SMOOTH SCROLL ENHANCEMENT ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== CONTACT FORM FUNCTIONALITY ====================
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const formData = new FormData(this);
            const name = this.querySelector('input[placeholder="Your Name"]').value.trim();
            const email = this.querySelector('input[placeholder="Your Email"]').value.trim();
            const subject = this.querySelector('input[placeholder="Subject"]').value.trim();
            const message = this.querySelector('textarea[placeholder="Your Message"]').value.trim();

            // Validation
            if (!name || !email || !subject || !message) {
                showFormMessage('Please fill in all fields', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }

            // Simulate form submission
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // Simulate delay
            setTimeout(() => {
                // In a real application, you would send this to a server
                console.log('Form Data:', { name, email, subject, message });
                
                showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 1500);
        });
    }

    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            formMessage.className = 'form-message';
        }, 5000);
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll(
        '.about-stats, .stat-card, .skill-category, .project-card, .info-card'
    );

    elementsToObserve.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.animationDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
});

// ==================== SCROLL REVEAL ANIMATION ====================
class ScrollReveal {
    constructor() {
        this.reveals = document.querySelectorAll('.skill-tag, .tech-badge, .project-link');
        this.init();
    }

    init() {
        this.reveals.forEach(reveal => {
            reveal.style.opacity = '0.7';
            reveal.addEventListener('mouseenter', () => this.onEnter(reveal));
            reveal.addEventListener('mouseleave', () => this.onLeave(reveal));
        });
    }

    onEnter(element) {
        element.style.opacity = '1';
    }

    onLeave(element) {
        element.style.opacity = '0.7';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ScrollReveal();
});

// ==================== PERFORMANCE MONITORING ====================
if ('PerformanceObserver' in window) {
    try {
        const perfObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log(`${entry.name}: ${entry.duration}ms`);
            }
        });

        perfObserver.observe({ entryTypes: ['navigation', 'resource', 'paint'] });
    } catch (e) {
        console.log('Performance monitoring not available');
    }
}

// ==================== LAZY LOADING PLACEHOLDER ====================
class LazyLoader {
    constructor() {
        this.images = document.querySelectorAll('[data-src]');
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });

            this.images.forEach(img => imageObserver.observe(img));
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new LazyLoader();
});

// ==================== ACTIVE LINK HIGHLIGHTING ====================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active style to nav links
const style = document.createElement('style');
style.textContent = `.nav-link.active { color: var(--primary-color); }`;
document.head.appendChild(style);

// ==================== KEYBOARD NAVIGATION ====================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// ==================== UTILITY FUNCTIONS ====================
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

function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==================== THEME PERSISTENCE ====================
function initializeTheme() {
    const darkMode = localStorage.getItem('darkMode') !== 'false';
    applyTheme(darkMode);
}

function applyTheme(isDarkMode) {
    const root = document.documentElement;
    if (isDarkMode) {
        root.style.colorScheme = 'dark';
    } else {
        root.style.colorScheme = 'light';
    }
    localStorage.setItem('darkMode', isDarkMode);
}

document.addEventListener('DOMContentLoaded', initializeTheme);

// ==================== ACCESSIBILITY ENHANCEMENTS ====================
// Add ARIA labels for better screen reader support
document.addEventListener('DOMContentLoaded', () => {
    // Add main landmark
    const mainContent = document.querySelector('body');
    
    // Ensure proper heading hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let headingCount = {};
    headings.forEach(heading => {
        const level = heading.tagName;
        headingCount[level] = (headingCount[level] || 0) + 1;
    });

    // Add skip to main content link if not present
    if (!document.querySelector('a.skip-link')) {
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 0;
            background: var(--primary-color);
            color: white;
            padding: 8px;
            text-decoration: none;
            z-index: 100;
            border-radius: 0 0 4px 0;
        `;
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '0';
        });
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
});

// ==================== ERROR HANDLING ====================
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// ==================== ANALYTICS PLACEHOLDER ====================
function trackEvent(eventName, eventData = {}) {
    // Placeholder for analytics tracking
    // In production, integrate with Google Analytics, Mixpanel, etc.
    console.log(`Event tracked: ${eventName}`, eventData);
}

// Track page view on load
document.addEventListener('DOMContentLoaded', () => {
    trackEvent('page_view', {
        page_title: document.title,
        page_path: window.location.pathname
    });
});

// Track button clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('button_click', {
            button_text: button.textContent,
            button_class: button.className
        });
    });
});

// ==================== INITIALIZATION ====================
console.log('Portfolio website loaded successfully');
