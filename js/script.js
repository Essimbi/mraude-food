// Smooth Scroll
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

// Navigation Effects
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-links a');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Navbar transformation
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Hide/Show navbar on scroll
    if (currentScroll > lastScroll && currentScroll > 500) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
});

// Menu hamburger - CORRECTION: Suppression du code erroné
// hamburger.addEventListener('click', () => {
//     navLinks.classList.toggle('active');
//     hamburger.classList.toggle('active');
// });

// Parallax Effect
const handleParallax = () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(window.pageYOffset * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
};

window.addEventListener('scroll', handleParallax);

// Intersection Observer for Animations
const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
};

const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver(animateOnScroll, observerOptions);

// Sélection des éléments à animer
const animatedElements = document.querySelectorAll('.menu-item, .service-card, .specialite-content');
animatedElements.forEach(element => observer.observe(element));

// Smooth scroll pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    // Menu Tabs
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCategories = document.querySelectorAll('.menu-category');

    function switchTab(tabId) {
        // Remove active class from all tabs and categories
        menuTabs.forEach(t => t.classList.remove('active'));
        menuCategories.forEach(c => c.classList.remove('active'));

        // Add active class to clicked tab and corresponding category
        const activeTab = document.querySelector(`.menu-tab[data-tab="${tabId}"]`);
        const activeCategory = document.querySelector(`.menu-category.${tabId}`);

        if (activeTab && activeCategory) {
            activeTab.classList.add('active');
            activeCategory.classList.add('active');
        }
    }

    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.dataset.tab;
            switchTab(tabId);
        });
    });

    // Initialize first tab
    switchTab('weekend');

    // Update the current date for the daily menu
    const dailyDate = document.querySelector('.daily-date');
    if (dailyDate) {
        const options = { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric'
        };
        const currentDate = new Date().toLocaleDateString('fr-FR', options);
        dailyDate.textContent = currentDate.charAt(0).toUpperCase() + currentDate.slice(1);
    }

    // Menu Items Animation
    const menuItems = document.querySelectorAll('.menu-item');
    const menuObserverOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const menuObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                menuObserver.unobserve(entry.target);
            }
        });
    }, menuObserverOptions);

    menuItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transitionDelay = `${index * 0.1}s`;
        menuObserver.observe(item);
    });

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Initialize animations
    const animatedElements = document.querySelectorAll(
        '.intro-text, .intro-image, .signature-content, .menu-item, .service-card'
    );
    animatedElements.forEach(el => observer.observe(el));

    // Hero Section Parallax
    const heroSection = document.querySelector('#hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }

    // Smooth reveal of page
    document.body.classList.add('loaded');
});

// Parallax effect pour le hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('#hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
});
