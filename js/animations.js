// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Parallax effect for hero sections
window.addEventListener('scroll', function() {
    const heroSections = document.querySelectorAll('.hero-section');
    heroSections.forEach(hero => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        hero.style.backgroundPositionY = rate + 'px';
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

// Observe elements for fade-in
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.service-card, .project-card, .property-card');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Add CSS class for fade-in animation
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in-visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Counter animation for stats
function animateCounter(element) {
    const target = parseInt(element.textContent);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('%') ? '%' : element.textContent.includes('+') ? '+' : element.textContent.includes('M') ? 'M' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => animateCounter(stat));
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const statsRows = document.querySelectorAll('.stats-row');
    statsRows.forEach(row => statsObserver.observe(row));
});

// Mobile menu close on link click
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });
});

// In-Page Image Viewer
document.addEventListener('DOMContentLoaded', function() {
    // Create viewer HTML structure
    const viewerHTML = `
        <div id="imageViewer" class="image-viewer-overlay">
            <button class="image-viewer-close" onclick="closeImageViewer()">
                <i class="fas fa-times"></i>
            </button>
            <button class="image-viewer-nav image-viewer-prev" onclick="navigateImage(-1)">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="image-viewer-nav image-viewer-next" onclick="navigateImage(1)">
                <i class="fas fa-chevron-right"></i>
            </button>
            <div class="image-viewer-container">
                <img id="viewerImage" class="image-viewer-img" src="" alt="">
                <div id="viewerTitle" class="image-viewer-title"></div>
                <div id="viewerCounter" class="image-viewer-counter"></div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', viewerHTML);
    
    // Setup clickable images
    setupImageViewer();
});

let currentImageGroup = [];
let currentImageIndex = 0;

function setupImageViewer() {
    // Find all images with data-viewer attribute
    const clickableImages = document.querySelectorAll('[data-viewer="true"]');
    
    clickableImages.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.classList.add('clickable-image');
        img.addEventListener('click', function() {
            const group = this.dataset.group || 'default';
            currentImageGroup = Array.from(document.querySelectorAll(`[data-group="${group}"]`));
            currentImageIndex = currentImageGroup.indexOf(this);
            openImageViewer(this);
        });
    });
}

function openImageViewer(imgElement) {
    const viewer = document.getElementById('imageViewer');
    const viewerImg = document.getElementById('viewerImage');
    const viewerTitle = document.getElementById('viewerTitle');
    const viewerCounter = document.getElementById('viewerCounter');
    
    viewerImg.src = imgElement.dataset.fullsrc || imgElement.src;
    viewerTitle.textContent = imgElement.dataset.title || imgElement.alt || '';
    
    if (currentImageGroup.length > 1) {
        viewerCounter.textContent = `${currentImageIndex + 1} / ${currentImageGroup.length}`;
    } else {
        viewerCounter.textContent = '';
    }
    
    viewer.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Update navigation visibility
    updateNavVisibility();
}

function closeImageViewer() {
    const viewer = document.getElementById('imageViewer');
    viewer.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

function navigateImage(direction) {
    if (currentImageGroup.length <= 1) return;
    
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) {
        currentImageIndex = currentImageGroup.length - 1;
    } else if (currentImageIndex >= currentImageGroup.length) {
        currentImageIndex = 0;
    }
    
    const imgElement = currentImageGroup[currentImageIndex];
    const viewerImg = document.getElementById('viewerImage');
    const viewerTitle = document.getElementById('viewerTitle');
    const viewerCounter = document.getElementById('viewerCounter');
    
    // Fade effect
    viewerImg.style.opacity = '0';
    setTimeout(() => {
        viewerImg.src = imgElement.dataset.fullsrc || imgElement.src;
        viewerTitle.textContent = imgElement.dataset.title || imgElement.alt || '';
        viewerCounter.textContent = `${currentImageIndex + 1} / ${currentImageGroup.length}`;
        viewerImg.style.opacity = '1';
        updateNavVisibility();
    }, 200);
}

function updateNavVisibility() {
    const prevBtn = document.querySelector('.image-viewer-prev');
    const nextBtn = document.querySelector('.image-viewer-next');
    
    if (currentImageGroup.length <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
    }
}

// Close viewer on Escape key and navigate with arrow keys
document.addEventListener('keydown', function(e) {
    const viewer = document.getElementById('imageViewer');
    if (!viewer.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
        closeImageViewer();
    } else if (e.key === 'ArrowLeft') {
        navigateImage(-1);
    } else if (e.key === 'ArrowRight') {
        navigateImage(1);
    }
});

// Close viewer when clicking outside the image
document.addEventListener('click', function(e) {
    const viewer = document.getElementById('imageViewer');
    if (e.target === viewer) {
        closeImageViewer();
    }
});
