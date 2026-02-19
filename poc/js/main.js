// Cookie Popup
function acceptCookies() {
    document.getElementById('cookiePopup').classList.add('hidden');
    localStorage.setItem('cookiesAccepted', 'true');
}

function declineCookies() {
    document.getElementById('cookiePopup').classList.add('hidden');
    localStorage.setItem('cookiesDeclined', 'true');
}

// Check if cookies already handled
if (localStorage.getItem('cookiesAccepted') || localStorage.getItem('cookiesDeclined')) {
    document.getElementById('cookiePopup').classList.add('hidden');
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('mainHeader');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Initialize Swiper Gallery
const gallerySwiper = new Swiper('.gallerySwiper', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: '.swiper-btn.next',
        prevEl: '.swiper-btn.prev',
    },
    on: {
        slideChange: function() {
            updateCounter(this.realIndex + 1, this.slides.length - 2);
        }
    }
});

function updateCounter(current, total) {
    document.querySelector('.swiper-counter .current').textContent = current;
    document.querySelector('.swiper-counter .total').textContent = total;
}

// Timeline Navigation
const timelineCards = document.querySelectorAll('.timeline-card');
let currentTimelineIndex = 0;

function showTimelineCard(index) {
    timelineCards.forEach((card, i) => {
        card.classList.remove('active');
        if (i === index) {
            card.classList.add('active');
        }
    });
    updateTimelineCounter(index + 1, timelineCards.length);
}

function updateTimelineCounter(current, total) {
    document.querySelector('.timeline-counter .current').textContent = current;
    document.querySelector('.timeline-counter .total').textContent = total;
}

document.querySelector('.timeline-btn.next').addEventListener('click', function() {
    currentTimelineIndex = (currentTimelineIndex + 1) % timelineCards.length;
    showTimelineCard(currentTimelineIndex);
});

document.querySelector('.timeline-btn.prev').addEventListener('click', function() {
    currentTimelineIndex = (currentTimelineIndex - 1 + timelineCards.length) % timelineCards.length;
    showTimelineCard(currentTimelineIndex);
});

// Initialize first timeline card
showTimelineCard(0);

// SVG Mask Animation
const maskPath = document.getElementById('maskPath');
const maskTexts = [
    { outside: 'EXCEPTIONAL\nDESIGN', inside: 'EXCEPTIONAL\nDESIGN' },
    { outside: 'PREMIUM\nHOMES', inside: 'PREMIUM\nHOMES' },
    { outside: 'MODERN\nLIVING', inside: 'MODERN\nLIVING' }
];

let currentMaskIndex = 0;

function animateMask() {
    currentMaskIndex = (currentMaskIndex + 1) % maskTexts.length;
    
    // Animate path morph (simplified - just using different paths)
    const paths = [
        "M600,200 Q800,100 900,300 T1000,600 T800,900 T400,1000 T200,700 T300,400 Z",
        "M500,300 Q700,200 800,400 T900,700 T700,1000 T300,900 T100,600 T200,300 Z",
        "M400,400 Q600,300 700,500 T800,800 T600,1100 T200,1000 T0,700 T100,400 Z"
    ];
    
    maskPath.setAttribute('d', paths[currentMaskIndex]);
    
    // Update text
    const text = maskTexts[currentMaskIndex];
    document.getElementById('outsideText').innerHTML = text.outside.split('\n').map((line, i) => 
        `<tspan x="50%" dy="${i === 0 ? '0' : '1.2em'}">${line}</tspan>`
    ).join('');
    document.getElementById('insideText').innerHTML = text.inside.split('\n').map((line, i) => 
        `<tspan x="50%" dy="${i === 0 ? '0' : '1.2em'}">${line}</tspan>`
    ).join('');
}

// Animate mask every 4 seconds
setInterval(animateMask, 4000);

// Scroll-triggered animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.caption-text, .travel-card, .clip-text').forEach(el => {
    observer.observe(el);
});

// Parallax effect for hero video
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Marquee pause on hover
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
    marqueeTrack.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
    });
    marqueeTrack.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
    });
}

// Instagram marquee pause on hover
const instaTracks = document.querySelectorAll('.insta-track');
instaTracks.forEach(track => {
    track.addEventListener('mouseenter', function() {
        instaTracks.forEach(t => t.style.animationPlayState = 'paused');
    });
    track.addEventListener('mouseleave', function() {
        instaTracks.forEach(t => t.style.animationPlayState = 'running');
    });
});

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        alert('Thank you for subscribing with: ' + email);
        this.reset();
    });
}

// Smooth scroll for navigation
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

// Tooltip functionality
const tooltipTriggers = document.querySelectorAll('.tooltip-trigger');
tooltipTriggers.forEach(trigger => {
    trigger.addEventListener('mouseenter', function() {
        // Create tooltip
        const tooltipText = this.getAttribute('data-tooltip');
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.innerHTML = tooltipText;
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(0,0,0,0.9);
            color: white;
            padding: 1.5rem;
            max-width: 400px;
            font-size: 0.9rem;
            z-index: 1000;
            pointer-events: none;
        `;
        document.body.appendChild(tooltip);
        
        // Position tooltip
        const rect = this.getBoundingClientRect();
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top = (rect.bottom + 10) + 'px';
        
        this.tooltip = tooltip;
    });
    
    trigger.addEventListener('mouseleave', function() {
        if (this.tooltip) {
            this.tooltip.remove();
            this.tooltip = null;
        }
    });
});

// Add CSS class for scroll animations
const style = document.createElement('style');
style.textContent = `
    .caption-text, .travel-card, .clip-text {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .caption-text.in-view, .travel-card.in-view, .clip-text.in-view {
        opacity: 1;
        transform: translateY(0);
    }
    
    .custom-tooltip {
        animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Initialize animations on load
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
