// Gestion du menu mobile
document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments du menu mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const body = document.body;

    // Fonction pour basculer le menu mobile
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.classList.toggle('no-scroll');
    }

    // Ajout des écouteurs d'événements
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    // Fermer le menu lors du clic sur un lien
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Gestion du défilement de la navbar
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            // Défilement vers le bas
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            // Défilement vers le haut
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });

    // Menu Tabs Functionality
    const tabContainer = document.querySelector('.menu-tabs');
    if (tabContainer) {
        // Get all tabs and categories
        const tabs = tabContainer.querySelectorAll('.menu-tab');
        const categories = document.querySelectorAll('.menu-category');

        // Remove existing event listeners (if any)
        const newTabContainer = tabContainer.cloneNode(true);
        tabContainer.parentNode.replaceChild(newTabContainer, tabContainer);

        // Add event listeners to new tabs
        newTabContainer.querySelectorAll('.menu-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                // Update tabs
                newTabContainer.querySelectorAll('.menu-tab').forEach(t => {
                    t.classList.remove('active');
                });
                this.classList.add('active');

                // Update content
                const targetCategory = this.getAttribute('data-tab');
                categories.forEach(category => {
                    if (category.classList.contains(targetCategory)) {
                        category.classList.add('active');
                        category.style.display = 'block';
                    } else {
                        category.classList.remove('active');
                        setTimeout(() => {
                            category.style.display = 'none';
                        }, 300); // Match this with CSS transition time
                    }
                });
            });
        });

        // Update the current date
        const dailyDate = document.querySelector('.daily-date');
        if (dailyDate) {
            const now = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            dailyDate.textContent = now.toLocaleDateString('fr-FR', options);
        }

        // Ensure weekend menu is shown by default
        const weekendTab = newTabContainer.querySelector('[data-tab="weekend"]');
        if (weekendTab) {
            weekendTab.click();
        }
    }

    // Animation au défilement
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };

    // Écouteur d'événement pour l'animation au défilement
    window.addEventListener('scroll', animateOnScroll);
    
    // Exécuter une première fois au chargement
    animateOnScroll();
});
