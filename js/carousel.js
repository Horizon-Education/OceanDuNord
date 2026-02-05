// Carousel d'onboarding
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    let slideInterval;

    // Fonction pour changer de slide
    function goToSlide(n) {
        // Reset l'état actif
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        
        // Mettre à jour l'index
        currentSlide = (n + slides.length) % slides.length;
        
        // Appliquer l'état actif
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    // Fonction pour passer au slide suivant
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Fonction pour démarrer le carousel automatique
    function startCarousel() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Fonction pour arrêter le carousel
    function stopCarousel() {
        clearInterval(slideInterval);
    }

    // Ajouter les événements aux indicateurs
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopCarousel();
            goToSlide(index);
            startCarousel();
        });
        
        // Animation au survol (pour desktop)
        indicator.addEventListener('mouseenter', () => {
            if (!indicator.classList.contains('active')) {
                indicator.style.transform = 'scale(1.3)';
            }
        });
        
        indicator.addEventListener('mouseleave', () => {
            if (!indicator.classList.contains('active')) {
                indicator.style.transform = 'scale(1)';
            }
        });
    });

    // Navigation par swipe pour mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const carouselContainer = document.querySelector('.carousel');

    carouselContainer.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carouselContainer.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe gauche -> slide suivant
            stopCarousel();
            nextSlide();
            startCarousel();
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe droite -> slide précédent
            stopCarousel();
            goToSlide(currentSlide - 1);
            startCarousel();
        }
    }

    // Démarrer le carousel automatique
    startCarousel();

    // Pause le carousel quand l'utilisateur interagit
    carouselContainer.addEventListener('mouseenter', stopCarousel);
    carouselContainer.addEventListener('mouseleave', startCarousel);
    
    // Pour mobile : pause au touch
    carouselContainer.addEventListener('touchstart', stopCarousel);
    carouselContainer.addEventListener('touchend', () => {
        setTimeout(startCarousel, 3000);
    });
});