/* ========================================
   MAIN JAVASCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    /* ========================================
       HEADER SCROLL EFFECT
       ======================================== */
    const header = document.getElementById('mainHeader');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('head-pinned');
        } else {
            header.classList.remove('head-pinned');
        }
    });
    
    
    /* ========================================
       SCROLL INDICATOR
       ======================================== */
    const scrollIndicator = document.getElementById('scrollIndicator');
    const footer = document.querySelector('.footer');
    const sections = ['hero-section', 'about', 'developments', 'team', 'services', 'contact'];
    
    // Click to scroll to next section
    scrollIndicator.addEventListener('click', () => {
        const currentSection = sections.find(id => {
            const el = document.getElementById(id);
            if (!el) return false;
            const rect = el.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom > 100;
        }) || 'hero-section';
        
        const currentIndex = sections.indexOf(currentSection);
        const nextSection = sections[currentIndex + 1];
        
        if (nextSection) {
            const nextEl = document.getElementById(nextSection);
            if (nextEl) {
                nextEl.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
    
    // Hide scroll indicator when near footer
    window.addEventListener('scroll', () => {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (footerRect.top < windowHeight + 100) {
            scrollIndicator.classList.add('hidden');
        } else {
            scrollIndicator.classList.remove('hidden');
        }
    });
    
    
    /* ========================================
       MOBILE MENU TOGGLE
       ======================================== */
    const burger = document.getElementById('burger');
    const asideMenu = document.getElementById('asideMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    
    burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        asideMenu.classList.toggle('open');
        menuOverlay.classList.toggle('open');
        document.body.classList.toggle('stop-scrolling');
    });
    
    menuOverlay.addEventListener('click', () => {
        burger.classList.remove('open');
        asideMenu.classList.remove('open');
        menuOverlay.classList.remove('open');
        document.body.classList.remove('stop-scrolling');
    });
    
    // Close menu when clicking a link (but not when toggling sub-menus)
    asideMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            const hasSubMenu = link.nextElementSibling && link.nextElementSibling.classList.contains('sub-menu');
            if (hasSubMenu) return;
            
            burger.classList.remove('open');
            asideMenu.classList.remove('open');
            menuOverlay.classList.remove('open');
            document.body.classList.remove('stop-scrolling');
        });
    });
    
    
    /* ========================================
       SUB-MENU TOGGLE
       ======================================== */
    const menuItems = document.querySelectorAll('.aside-menu .menu-item > a.menu-link');
    
    menuItems.forEach(link => {
        link.addEventListener('click', (e) => {
            const menuItem = link.parentElement;
            const subMenu = menuItem.querySelector('.sub-menu');
            const toggle = menuItem.querySelector('.menu-toggle');
            
            if (!subMenu) return;
            
            e.preventDefault();
            e.stopPropagation();
            
            menuItems.forEach(otherLink => {
                const otherItem = otherLink.parentElement;
                if (otherItem !== menuItem) {
                    otherItem.classList.remove('menu-open');
                    const otherSubMenu = otherItem.querySelector('.sub-menu');
                    const otherToggle = otherItem.querySelector('.menu-toggle');
                    if (otherSubMenu) {
                        otherSubMenu.classList.remove('open');
                        otherToggle.textContent = '+';
                    }
                }
            });
            
            if (menuItem.classList.contains('menu-open')) {
                menuItem.classList.remove('menu-open');
                subMenu.classList.remove('open');
                toggle.textContent = '+';
            } else {
                menuItem.classList.add('menu-open');
                subMenu.classList.add('open');
                toggle.textContent = '−';
            }
        });
    });
    
    
    /* ========================================
   DEVELOPMENTS FILTER
   ======================================== */
    const devFilterBtns = document.querySelectorAll('.development-filters__btn');
    const devCards = document.querySelectorAll('.development-card');

    // Set default filter to "completed"
    const defaultFilter = 'completed';
    devFilterBtns.forEach(btn => {
        if (btn.dataset.filter === defaultFilter) {
            btn.classList.add('development-filters__btn--active');
        } else {
            btn.classList.remove('development-filters__btn--active');
        }
    });
    devCards.forEach(card => {
        const status = card.dataset.status;
        if (status === defaultFilter) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });

    devFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            devFilterBtns.forEach(b => b.classList.remove('development-filters__btn--active'));
            btn.classList.add('development-filters__btn--active');

            devCards.forEach(card => {
                const status = card.dataset.status;

                if (filter === 'all' || status === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    
    /* ========================================
       HERO TITLE GRADIENT ANIMATION
       ======================================== */
    const titleSpans = document.querySelectorAll('.hero-title span');
    
    gsap.set(titleSpans, { '--stop-hover': '0%' });
    
    const customEase = CustomEase.create("custom", "M0,0 C0.548,0.032 0.63,1 1,1 ");
    
    titleSpans.forEach(span => {
        span.addEventListener('mouseenter', function() {
            gsap.to(this, {
                '--stop-hover': '100%',
                ease: customEase,
                duration: 0.8
            });
        });
        
        span.addEventListener('mouseleave', function() {
            gsap.to(this, {
                '--stop-hover': '0%',
                ease: customEase,
                duration: 0.8
            });
        });
    });
    
});
