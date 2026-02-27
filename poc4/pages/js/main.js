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
