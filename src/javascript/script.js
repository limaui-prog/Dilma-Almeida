document.addEventListener('DOMContentLoaded', function() {
    const cardsContainer = document.getElementById('cards');
    const prevButton = document.querySelector('.fa-angle-left');
    const nextButton = document.querySelector('.fa-angle-right');
    const cards = document.querySelectorAll('.Card');
    
    let isDragging = false;
    let startX, scrollLeft;
    let currentIndex = 0;
    const cardsToShow = 2;
    let clickAllowed = true;

    const cardLinks = [
        'sobre.html',
        'https://wa.me/557182148996',
        'https://www.trgclub.com/terapeuta/maria-almeida-2025-07-01-11-30-38-0300?name=Maria%20Dilma&gender=female',
        'https://wa.me/5571983618316/'
    ];

    function navigate(direction) {
        if (isDragging) return;
        
        if (direction === 'next' && currentIndex < cards.length - cardsToShow) {
            currentIndex++;
        } else if (direction === 'prev' && currentIndex > 0) {
            currentIndex--;
        }
        
        updateCarousel();
    }

    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth + 20;
        cardsContainer.scrollTo({
            left: currentIndex * cardWidth,
            behavior: 'smooth'
        });
        updateButtons();
    }

    function updateButtons() {
        prevButton.style.display = currentIndex <= 0 ? 'none' : 'block';
        nextButton.style.display = currentIndex >= cards.length - cardsToShow ? 'none' : 'block';
    }

    // Controle de cursor e arraste
    cardsContainer.addEventListener('mouseenter', () => {
        cardsContainer.style.cursor = 'grab';
    });

    cardsContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - cardsContainer.offsetLeft;
        scrollLeft = cardsContainer.scrollLeft;
        cardsContainer.style.cursor = 'grabbing';
        cardsContainer.style.scrollBehavior = 'auto';
        clickAllowed = true;
    });

    cardsContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        if (Math.abs(e.pageX - startX) > 5) {
            clickAllowed = false;
        }
        
        const x = e.pageX - cardsContainer.offsetLeft;
        const walk = (x - startX) * 2;
        cardsContainer.scrollLeft = scrollLeft - walk;
    });

    function endDrag() {
        if (isDragging) {
            isDragging = false;
            cardsContainer.style.cursor = 'grab';
            cardsContainer.style.scrollBehavior = 'smooth';
            
            const cardWidth = cards[0].offsetWidth + 20;
            currentIndex = Math.round(cardsContainer.scrollLeft / cardWidth);
            updateCarousel();
            
            setTimeout(() => { clickAllowed = true; }, 100);
        }
    }

    cardsContainer.addEventListener('mouseup', endDrag);
    cardsContainer.addEventListener('mouseleave', endDrag);

    // Eventos de clique nos cards
    cards.forEach((card, index) => {
        card.style.cursor = 'pointer'; // Cursor de clique para o card
        
        card.addEventListener('mouseenter', () => {
            if (!isDragging) {
                card.style.cursor = 'pointer';
            }
        });
        
        card.addEventListener('click', (e) => {
            if (!isDragging && clickAllowed && cardLinks[index]) {
                window.location.href = cardLinks[index];
            }
        });
    });

    // Eventos dos botões
    nextButton.addEventListener('click', (e) => {
        e.stopPropagation();
        navigate('next');
    });

    prevButton.addEventListener('click', (e) => {
        e.stopPropagation();
        navigate('prev');
    });

    // Inicialização
    updateButtons();
    updateCarousel();

    // Redimensionamento
    window.addEventListener('resize', () => {
        updateCarousel();
    });

    // Botão bio
    document.getElementById('bioButton').addEventListener('click', function() {
        window.location.href = 'https://wa.me/5585985297269';
    });
    
    // Animações ScrollReveal
    ScrollReveal().reveal('header', {
        origin: 'top',
        duration: 1000,
        distance: '20%'
    });
    
    ScrollReveal().reveal('#social-media-buttons a', { 
        origin: 'bottom',
        duration: 600,
        distance: '20px',
        scale: 0.95,
        interval: 200, 
    });
    
    ScrollReveal().reveal('#bioButton', {
        origin: 'top',
        duration: 1000,
        distance: '100%'
    });
    
    // Animação da seta
    const arrow = document.querySelector('.Pay-arrow');
    
    function startAnimation() {
        arrow.style.animation = 'none'; 
        void arrow.offsetWidth; 
        arrow.style.animation = 'arrowRunRight 1.5s ease-in-out'; 
        setTimeout(startAnimation, 2500); 
    }
    
    startAnimation();
});
