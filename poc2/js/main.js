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
    initScrollChevron();
    initCookiePopup();
    initGalleryFullscreen();
    initDevelopmentFilters();
    initLazyMap();
});

/**
 * Floating Scroll Button
 * Handles page-by-page scrolling and back-to-top functionality
 */
function initScrollChevron() {
    const scrollBtn = document.getElementById('scrollBtn');
    if (!scrollBtn) return;
    
    const sections = document.querySelectorAll('section');
    let currentSectionIndex = 0;
    let isAtBottom = false;
    
    // Update button state based on scroll position
    function updateButtonState() {
        const scrollPosition = window.scrollY + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Check if at bottom of page
        if (scrollPosition >= documentHeight - 100) {
            isAtBottom = true;
            scrollBtn.classList.add('at-bottom');
        } else {
            isAtBottom = false;
            scrollBtn.classList.remove('at-bottom');
            
            // Find current section
            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom > 100) {
                    currentSectionIndex = index;
                }
            });
        }
    }
    
    // Handle button click
    scrollBtn.addEventListener('click', () => {
        if (isAtBottom) {
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // Scroll to next section
            const nextSection = sections[currentSectionIndex + 1];
            if (nextSection) {
                nextSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                // If no next section, scroll to bottom
                window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: 'smooth'
                });
            }
        }
    });
    
    // Update button on scroll
    window.addEventListener('scroll', updateButtonState, { passive: true });
    updateButtonState(); // Initial check
}

/**
 * Site Loader
 * Shows loading progress with animated percentage counter
 */
function initSiteLoader() {
    const loader = document.getElementById('siteLoader');
    const progressBar = document.querySelector('.site-loader__progress-bar');
    const swipe = document.querySelector('.site-loader__swipe');

    if (!loader) return;

    const duration = 1000;
    const start = performance.now();

    function animate(now) {
        const elapsed = now - start;
        let progress = Math.min(elapsed / duration, 1);

        progress = 1 - Math.pow(1 - progress, 3); // smooth ease

        if (progressBar) {
            progressBar.style.width = (progress * 100) + '%';
        }

        if (swipe) {
            swipe.style.transform = `translateX(${(-100 + progress * 100)}%)`;
        }

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            setTimeout(hideLoader, 300);
        }
    }

    requestAnimationFrame(animate);
}

function hideLoader() {
    const loader = document.getElementById('siteLoader');
    if (!loader) return;

    loader.style.transition = 'opacity 0.3s ease';
    loader.style.opacity = '0';

    setTimeout(() => {
        loader.style.display = 'none';
    }, 300);
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
window.addEventListener('DOMContentLoaded', initSiteLoader);

/**
 * Cookie Popup
 * Shows a non-intrusive cookie notice on page load
 */
function initCookiePopup() {
    const popup = document.getElementById('cookiePopup');
    const acceptBtn = document.getElementById('acceptCookies');
    
    if (!popup || !acceptBtn) return;
    
    // Check if user already accepted
    const cookieAccepted = localStorage.getItem('cookieAccepted');
    
    if (!cookieAccepted) {
        // Show popup after a short delay
        setTimeout(() => {
            popup.classList.add('active');
        }, 500);
    }
    
    // Handle accept button click
    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookieAccepted', 'true');
        popup.classList.remove('active');
    });
}

/**
 * Fullscreen Gallery Viewer
 * Click on gallery images to view fullscreen with navigation
 */
function initGalleryFullscreen() {
    const galleryItems = document.querySelectorAll('.gallery-grid__item img');
    if (galleryItems.length === 0) return;
    
    // Create fullscreen viewer elements
    const viewer = document.createElement('div');
    viewer.className = 'gallery-fullscreen';
    viewer.innerHTML = `
        <button class="gallery-fullscreen__close" aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
        </button>
        <button class="gallery-fullscreen__nav gallery-fullscreen__nav--prev" aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 18l-6-6 6-6"/>
            </svg>
        </button>
        <img class="gallery-fullscreen__image" src="" alt="">
        <button class="gallery-fullscreen__nav gallery-fullscreen__nav--next" aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18l6-6-6-6"/>
            </svg>
        </button>
        <span class="gallery-fullscreen__counter"></span>
    `;
    document.body.appendChild(viewer);
    
    const closeBtn = viewer.querySelector('.gallery-fullscreen__close');
    const prevBtn = viewer.querySelector('.gallery-fullscreen__nav--prev');
    const nextBtn = viewer.querySelector('.gallery-fullscreen__nav--next');
    const imageEl = viewer.querySelector('.gallery-fullscreen__image');
    const counterEl = viewer.querySelector('.gallery-fullscreen__counter');
    
    let currentIndex = 0;
    const images = Array.from(galleryItems).map(img => ({
        src: img.src,
        alt: img.alt
    }));
    
    function showImage(index) {
        currentIndex = index;
        if (currentIndex < 0) currentIndex = images.length - 1;
        if (currentIndex >= images.length) currentIndex = 0;
        
        imageEl.src = images[currentIndex].src;
        imageEl.alt = images[currentIndex].alt;
        counterEl.textContent = `${currentIndex + 1} / ${images.length}`;
    }
    
    function openViewer() {
        viewer.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeViewer() {
        viewer.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Add click listeners to gallery images
    galleryItems.forEach((img, index) => {
        img.parentElement.style.cursor = 'pointer';
        img.parentElement.addEventListener('click', () => {
            currentIndex = index;
            showImage(currentIndex);
            openViewer();
        });
    });
    
    // Close button
    closeBtn.addEventListener('click', closeViewer);
    
    // Navigation buttons
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showImage(currentIndex - 1);
    });
    
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showImage(currentIndex + 1);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!viewer.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeViewer();
        if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
        if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    });
    
    // Click outside image to close
    viewer.addEventListener('click', (e) => {
        if (e.target === viewer) closeViewer();
    });
}

/**
 * Lazy Load Google Map
 * Only loads when footer scrolls into view
 */
function initLazyMap() {
    const mapContainer = document.querySelector('.footer__map');
    const placeholder = document.getElementById('mapPlaceholder');
    
    if (!mapContainer || !placeholder) return;
    
    const mapSrc = mapContainer.dataset.src;
    if (!mapSrc) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Load the iframe
                const iframe = document.createElement('iframe');
                iframe.src = mapSrc;
                iframe.width = '100%';
                iframe.height = '100%';
                iframe.style.border = '0';
                iframe.allowFullscreen = '';
                iframe.loading = 'lazy';
                iframe.referrerPolicy = 'no-referrer-when-downgrade';
                
                mapContainer.innerHTML = '';
                mapContainer.appendChild(iframe);
                
                observer.unobserve(mapContainer);
            }
        });
    }, { rootMargin: '200px' });
    
    observer.observe(mapContainer);
}

/**
 * Development Filters
 * Filter developments by status: completed, in-progress, future
 */
function initDevelopmentFilters() {
    const filterBtns = document.querySelectorAll('.development-filters__btn');
    const cards = document.querySelectorAll('.residence-card[data-status]');
    
    if (filterBtns.length === 0 || cards.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('development-filters__btn--active'));
            btn.classList.add('development-filters__btn--active');
            
            // Filter cards with animation
            cards.forEach((card, index) => {
                const status = card.dataset.status;
                
                if (filter === 'all' || status === filter) {
                    card.style.display = 'flex';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}