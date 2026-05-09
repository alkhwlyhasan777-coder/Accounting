/* ============================================
    ACCOUNTING & FINANCE WEBSITE - MAIN JS
    Modern Interactive Features
   ============================================ */

// ============================================
// 1. INITIALIZATION
// ============================================



// ============================================
// 2. NAVBAR FUNCTIONALITY
// ============================================

function initNavbar() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', () => {
        updateActiveNav();
    });
}

function updateActiveNav() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero');

    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const target = link.getAttribute('data-target');
        if (target === currentSection) {
            link.classList.add('active');
        }
    });
}

// ============================================
// 3. THEME TOGGLE (DARK/LIGHT MODE)
// ============================================

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Check saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.getElementById('themeToggle').querySelector('i');
    if (theme === 'light') {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// ============================================
// 4. SMOOTH SCROLL NAVIGATION
// ============================================

function smoothScroll(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        gsap.to(window, {
            duration: 1.5,
            scrollTo: {
                y: target,
                offsetY: 80
            },
            ease: 'power3.inOut'
        });
    }
}

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link[data-target]');
    const dropdownLinks = document.querySelectorAll('.dropdown-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            smoothScroll(targetId);
        });
    });

    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const targetId = href.substring(1);
            smoothScroll(targetId);
        });
    });
}

// ============================================
// 5. SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroShapes = document.querySelectorAll('.hero-shape');

        heroShapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });

        // Floating icons animation
        const floatingIcons = document.querySelectorAll('.floating-icon');
        floatingIcons.forEach((icon, index) => {
            const speed = 0.3 + (index * 0.1);
            icon.style.transform = `translateY(${scrolled * speed * -1}px)`;
        });
    });
}

// ============================================
// 6. COUNTER ANIMATION
// ============================================

function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-count]');
    let hasAnimated = false;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const start = Date.now();

            const animate = () => {
                const now = Date.now();
                const progress = Math.min((now - start) / duration, 1);
                const current = Math.floor(progress * target);

                // Format number with commas
                counter.textContent = current.toLocaleString('ar');

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            animate();
        });
    };

    // Trigger animation when section comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        observer.observe(heroStats);
    }
}

// ============================================
// 7. FAQ FUNCTIONALITY
// ============================================

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    const faqSearch = document.getElementById('faqSearch');

    // FAQ accordion
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // FAQ search/filter
    if (faqSearch) {
        faqSearch.addEventListener('input', (e) => {
            const searchText = e.target.value.toLowerCase();

            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question span').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();

                if (question.includes(searchText) || answer.includes(searchText)) {
                    item.style.display = 'block';
                    // Highlight if searching
                    if (searchText) {
                        item.style.opacity = '1';
                    }
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}

// ============================================
// 8. FORM HANDLING
// ============================================

function initFormHandling() {
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
}

function handleNewsletterSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const emailInput = form.querySelector('input[type="email"]');
    const submitButton = form.querySelector('button');
    const email = emailInput.value;

    // Simple email validation
    if (!isValidEmail(email)) {
        showNotification('البريد الإلكتروني غير صحيح', 'error');
        return;
    }

    // Show loading state
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    submitButton.disabled = true;

    // Simulate API call
    setTimeout(() => {
        showNotification('تم الاشتراك بنجاح! شكراً لك', 'success');
        emailInput.value = '';
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 1500);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================
// 9. NOTIFICATIONS
// ============================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add notification styles if not exist
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                padding: 1rem 1.5rem;
                border-radius: 0.75rem;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                z-index: 2000;
                animation: slideInRight 0.3s ease-in-out;
            }

            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                color: #1f2937;
            }

            .notification-success { border-right: 4px solid #10b981; }
            .notification-success i { color: #10b981; }

            .notification-error { border-right: 4px solid #ef4444; }
            .notification-error i { color: #ef4444; }

            .notification-info { border-right: 4px solid #3b82f6; }
            .notification-info i { color: #3b82f6; }

            @media (max-width: 480px) {
                .notification {
                    right: 10px;
                    left: 10px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// 10. BACK TO TOP BUTTON
// ============================================

function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        gsap.to(window, {
            duration: 1,
            scrollTo: 0,
            ease: 'power3.inOut'
        });
    });
}

// ============================================
// 11. UTILITY FUNCTIONS
// ============================================

// Debounce function
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

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// ============================================
// 12. ADVANCED ANIMATIONS WITH GSAP
// ============================================

function initAdvancedAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Animate course cards on scroll
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                once: true
            },
            duration: 0.8,
            y: 30,
            opacity: 0,
            stagger: 0.1,
            delay: index * 0.1
        });
    });

    // Animate content cards
    const contentCards = document.querySelectorAll('.content-card');
    contentCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                once: true
            },
            duration: 0.8,
            y: 20,
            opacity: 0,
            stagger: 0.1
        });
    });
}

// Initialize on scroll if GSAP is loaded
if (typeof gsap !== 'undefined') {
    window.addEventListener('load', initAdvancedAnimations);
}

// ============================================
// 13. MOBILE OPTIMIZATIONS
// ============================================

// Prevent double-tap zoom on buttons
document.addEventListener('touchstart', function() {}, false);

// Handle mobile keyboard
window.addEventListener('orientationchange', function() {
    window.scrollTo(0, 0);
});

// ============================================
// 14. PERFORMANCE OPTIMIZATIONS
// ============================================

// Lazy loading for images (if needed)
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

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ============================================
// 15. ERROR HANDLING
// ============================================

window.addEventListener('error', (event) => {
    console.error('Error:', event.error);
    // You can send this to a logging service
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled rejection:', event.reason);
});

// ============================================
// 16. EXPORT PUBLIC FUNCTIONS
// ============================================

window.smoothScroll = smoothScroll;
window.handleNewsletterSubmit = handleNewsletterSubmit;
window.showNotification = showNotification;
///////////////////////////Log in///////////////////////////////////
const btnGold = document.querySelectorAll(".btn-gold");
const isLogin = localStorage.getItem("isLogin");
if (isLogin) {
    btnGold.forEach((b) => {
        b.style.display = "none";
    });
}
///////////////////Sgin up//////////////////////
// import formValidation from "./sinup.js";
// const btnSingUp = document.querySelectorAll(".btn-outline");
    
// if (formValidation()) {
//     btnSingUp.forEach((b) => {
//         b.style.display = "none";
//     });
// // }
import formValidation from "./sinup.js";

const btnSingUp = document.querySelectorAll(".btn-outline");
const submitBtn = document.querySelector(".add-acount");

submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (formValidation()) {
        btnSingUp.forEach((b) => {
            b.style.display = "none";
        });
    }
});