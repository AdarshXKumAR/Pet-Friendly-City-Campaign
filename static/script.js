// Mobile menu toggle functionality
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
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

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.8)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.2)';
    }
});

// Form submission
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('🎉 Welcome to the pack! We\'ll be in touch soon to start making cities more paw-some together!');
});

// Add some dynamic floating paws
function createFloatingPaw() {
    const paw = document.createElement('div');
    paw.className = 'floating-paw';
    paw.textContent = ['🐾', '🐶', '🐱', '❤️'][Math.floor(Math.random() * 4)];
    paw.style.left = Math.random() * 100 + '%';
    paw.style.animationDelay = Math.random() * 15 + 's';
    document.querySelector('.bg-animation').appendChild(paw);

    // Remove after animation
    setTimeout(() => {
        paw.remove();
    }, 15000);
}

// Create new floating paws periodically
setInterval(createFloatingPaw, 3000);

// Handle window resize to ensure mobile menu works properly
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Add these functions to your existing script.js file

// Pet Carousel functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.pet-card');
const totalSlides = slides.length;

function showSlide(index) {
    const carousel = document.getElementById('petCarousel');
    const dots = document.querySelectorAll('.dot');
    
    // Ensure index is within bounds
    if (index >= totalSlides) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = totalSlides - 1;
    } else {
        currentSlideIndex = index;
    }
    
    // Move carousel
    const translateX = -currentSlideIndex * 100;
    carousel.style.transform = `translateX(${translateX}%)`;
    
    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlideIndex);
    });
}

function nextSlide() {
    showSlide(currentSlideIndex + 1);
}

function prevSlide() {
    showSlide(currentSlideIndex - 1);
}

function currentSlide(index) {
    showSlide(index - 1);
}

// Auto-play carousel
let autoPlayInterval = setInterval(nextSlide, 5000);

// Pause auto-play on hover
const carouselContainer = document.querySelector('.pet-carousel-container');
if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });

    carouselContainer.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(nextSlide, 5000);
    });
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', () => {
    showSlide(0);
});