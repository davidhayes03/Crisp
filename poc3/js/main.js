// Main JavaScript for Crisp Construction
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const headerNav = document.querySelector('.header__nav');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            headerNav.classList.toggle('active');
        });
    }
});
