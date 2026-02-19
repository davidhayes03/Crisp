// Hero Slider
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

setInterval(nextSlide, 5000);

// Initialize Swiper
const swiper = new Swiper('.developmentSwiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        768: {
            slidesPerView: 1.5,
            centeredSlides: true,
        },
        992: {
            slidesPerView: 2,
            centeredSlides: true,
        },
    },
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
        }
    });
}, observerOptions);

// Observe elements with fade-in class
document.querySelectorAll('[data-aos]').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Add CSS class for fade animation
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .fade-in-visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Parallax effect for CTA background
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const ctaBackground = document.querySelector('.cta-background');
    if (ctaBackground) {
        ctaBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Mobile menu close on link click
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
            bsCollapse.hide();
        }
    });
});

// Gallery image hover effect
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// Development card hover parallax
document.querySelectorAll('.development-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = (x / rect.width - 0.5) * 10;
        const yPercent = (y / rect.height - 0.5) * 10;
        
        const img = this.querySelector('img');
        if (img) {
            img.style.transform = `scale(1.05) translate(${xPercent}px, ${yPercent}px)`;
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const img = this.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1)';
        }
    });
});
