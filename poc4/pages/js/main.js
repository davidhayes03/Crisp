// Header scroll effect
const header = document.getElementById('mainHeader');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('head-pinned');
    } else {
        header.classList.remove('head-pinned');
    }
});

// Menu toggle
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

// Menu close button
const menuClose = document.getElementById('menuClose');
menuClose.addEventListener('click', () => {
    burger.classList.remove('open');
    asideMenu.classList.remove('open');
    menuOverlay.classList.remove('open');
    document.body.classList.remove('stop-scrolling');
});

// Scroll Indicator
const scrollIndicator = document.getElementById('scrollIndicator');
const footer = document.querySelector('.footer');
const sections = ['project-banner', 'project-header', 'project-gallery', 'contact-section'];

scrollIndicator.addEventListener('click', () => {
    const currentSection = sections.find(id => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom > 100;
    }) || 'project-banner';
    
    const currentIndex = sections.indexOf(currentSection);
    const nextSection = sections[currentIndex + 1];
    
    if (nextSection) {
        const nextEl = document.getElementById(nextSection);
        if (nextEl) {
            nextEl.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

window.addEventListener('scroll', () => {
    const footerRect = footer.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (footerRect.top < windowHeight + 100) {
        scrollIndicator.classList.add('hidden');
    } else {
        scrollIndicator.classList.remove('hidden');
    }
});

// Floorplan Lightbox
const floorplanBtn = document.getElementById('floorplanBtn');
const floorplanLightbox = document.getElementById('floorplanLightbox');
const lightboxClose = document.getElementById('lightboxClose');

floorplanBtn.addEventListener('click', (e) => {
    e.preventDefault();
    floorplanLightbox.classList.add('open');
    document.body.classList.add('stop-scrolling');
});

lightboxClose.addEventListener('click', () => {
    floorplanLightbox.classList.remove('open');
    document.body.classList.remove('stop-scrolling');
});

floorplanLightbox.addEventListener('click', (e) => {
    if (e.target === floorplanLightbox) {
        floorplanLightbox.classList.remove('open');
        document.body.classList.remove('stop-scrolling');
    }
});
