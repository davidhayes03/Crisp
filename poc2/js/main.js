/**
 * NUEVE RESIDENCES - MAIN JAVASCRIPT
 * Handles all interactive elements, animations, and page functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initSiteLoader();
    initBurgerMenu();
    initResidencesDropdown();
    initGalleryTabs();
    initFlickerAnimation();
    initSmoothScroll();
    initScrollAnimations();
    initHeroRotatingText();
});

/**
 * Site Loader
 * Shows loading progress with animated percentage counter
 */
function initSiteLoader() {
    const loader = document.getElementById('siteLoader');
    const percentage = document.getElementById('loaderPercentage');
    const progressBar = document.querySelector('.site-loader__progress-bar');
    
    if (!loader || !percentage) return;
    
    let progress = 0;
    const duration = 800; // 3 seconds minimum
    const interval = 30;
    const increment = 100 / (duration / interval);
    
    const loadingInterval = setInterval(() => {
        progress += increment;
        
        // Add some randomness for realistic loading
        if (Math.random() > 0.7) {
            progress += increment * 0.5;
        }
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            // Small delay before hiding loader
            setTimeout(() => {
                hideLoader();
            }, 400);
        }
        
        percentage.textContent = Math.floor(progress);
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
    }, interval);
    
    function hideLoader() {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        loader.classList.add('hidden');
        
        // Reveal content with animation
        document.body.style.overflow = 'auto';
        
        // Trigger entrance animations
        setTimeout(() => {
            document.querySelectorAll('.flicker-text').forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        }, 200);
    }
    
    // Prevent scrolling while loader is active
    document.body.style.overflow = 'hidden';
}

/**
 * Burger Menu Toggle
 * Handles the off-canvas menu open/close functionality
 */
function initBurgerMenu() {
    const burger = document.getElementById('burgerMenu');
    const offcanvas = document.getElementById('offcanvasMenu');
    
    if (!burger || !offcanvas) return;
    
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        offcanvas.classList.toggle('active');
        
        // Toggle body scroll
        if (offcanvas.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on menu items
    const menuLinks = offcanvas.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            offcanvas.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/**
 * Residences Dropdown
 * Accordion functionality for the Residences submenu
 */
function initResidencesDropdown() {
    const toggle = document.getElementById('residencesToggle');
    const submenu = document.getElementById('residencesSubmenu');
    
    if (!toggle || !submenu) return;
    
    
}

/**
 * Gallery Tabs
 * Tab switching functionality for the gallery section
 */
function initGalleryTabs() {
    const tabs = document.querySelectorAll('.gallery-tabs__tab');
    const panes = document.querySelectorAll('.gallery-tabs__pane');
    
    if (tabs.length === 0 || panes.length === 0) return;
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            // Remove active class from all tabs and panes
            tabs.forEach(t => t.classList.remove('gallery-tabs__tab--active'));
            panes.forEach(p => p.classList.remove('gallery-tabs__pane--active'));
            
            // Add active class to clicked tab and corresponding pane
            tab.classList.add('gallery-tabs__tab--active');
            
            const targetPane = document.querySelector(`[data-pane="${targetTab}"]`);
            if (targetPane) {
                targetPane.classList.add('gallery-tabs__pane--active');
                
                // Animate gallery items
                const items = targetPane.querySelectorAll('.gallery-grid__item');
                items.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    });
}

/**
 * Flicker Animation
 * Random flickering effect for text elements
 */
function initFlickerAnimation() {
    const flickerElements = document.querySelectorAll('.flicker-text');
    
    flickerElements.forEach(el => {
        // Random delay for each element
        const randomDelay = Math.random() * 3;
        el.style.animationDelay = `${randomDelay}s`;
    });
}

/**
 * Smooth Scroll
 * Smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Scroll Animations
 * Reveal animations on scroll using Intersection Observer
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll(
        '.residence-card, .gallery-grid__item, .experience-item, .deco-section__text'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add CSS class for animated elements
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Header Scroll Effect
 * Change header appearance on scroll
 */
let lastScrollY = window.scrollY;
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateHeader();
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

function updateHeader() {
    const header = document.getElementById('header');
    const currentScrollY = window.scrollY;
    
    if (!header) return;
    
    // Add shadow after scrolling
    if (currentScrollY > 100) {
        header.style.backgroundColor = 'rgba(18, 18, 18, 0.1)';
    } else {
        header.style.backgroundColor = 'transparent';
    }
    
    lastScrollY = currentScrollY;
}

/**
 * Parallax Effect
 * Subtle parallax for background images
 */
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.fullscreen-image__bg');
    
    parallaxElements.forEach(el => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        el.style.transform = `translateY(${rate}px)`;
    });
}, { passive: true });

/**
 * Scroll-triggered Background Color Transition
 * Alternates between light and dark backgrounds based on scroll position
 */
function initBackgroundTransition() {
    const sections = document.querySelectorAll('section');
    const body = document.body;
    
    // Define which sections should have dark background
    const darkSections = ['.amenities-section', '.local-guide', '.contact-hero'];
    
    const observerOptions = {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                const isDarkSection = darkSections.some(selector => section.matches(selector));
                
                if (isDarkSection) {
                    body.classList.remove('bg-light');
                    body.classList.add('bg-dark');
                } else {
                    body.classList.remove('bg-dark');
                    body.classList.add('bg-light');
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Initialize background transition
document.addEventListener('DOMContentLoaded', initBackgroundTransition);

/**
 * Image Lazy Loading with Fade
 */
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.onload = () => {
                    img.style.opacity = '1';
                };
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '50px' });
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        imageObserver.observe(img);
    });
});

/**
 * Menu Item Hover Sound Effect (Optional)
 * Add subtle interaction feedback
 */
document.querySelectorAll('.swap-hover').forEach(el => {
    el.addEventListener('mouseenter', () => {
        el.style.willChange = 'transform';
    });
    
    el.addEventListener('mouseleave', () => {
        el.style.willChange = 'auto';
    });
});

/**
 * Performance: Disable complex animations on touch devices
 */
function isTouchDevice() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}

if (isTouchDevice()) {
    document.body.classList.add('touch-device');
    
    // Simplify animations for mobile
    const style = document.createElement('style');
    style.textContent = `
        .touch-device .flicker-text {
            animation: none !important;
        }
        .touch-device .infinite-scroll-images__wrapper {
            animation-duration: 40s;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Hero Rotating Text
 * Cycles through 3 text variations with fade transitions
 */
function initHeroRotatingText() {
    const slides = document.querySelectorAll('.hero-text-slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    const interval = 5000; // 5 seconds per slide
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    // Start the rotation
    setInterval(nextSlide, interval);
}

/**
 * Keyboard Navigation
 * Accessibility improvements
 */
document.addEventListener('keydown', (e) => {
    const offcanvas = document.getElementById('offcanvasMenu');
    const burger = document.getElementById('burgerMenu');
    
    // Close menu with Escape key
    if (e.key === 'Escape' && offcanvas && offcanvas.classList.contains('active')) {
        offcanvas.classList.remove('active');
        burger.classList.remove('active');
        document.body.style.overflow = '';
    }
});

/**
 * Preload critical images
 */
function preloadImages() {
    const criticalImages = [
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&h=1080&fit=crop',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=533&fit=crop',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=267&fit=crop'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Start preloading after initial load
window.addEventListener('load', preloadImages);
