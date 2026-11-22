// ========================================
// Nexus Games - Main JavaScript
// ========================================

// DOM Content Loaded
window.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initHeroSlider();
    initCategories();
    initFeaturedGames();
    initNewReleases();
    initTopSellers();
    initPromoTimer();
    initNewsletter();
    initScrollEffects();
    initMobileMenu();
    initSearch();
    loadCartCount();
});

// ========================================
// Header Initialization
// ========================================

function initHeader() {
    const header = document.querySelector('.header-premium');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const nav = document.querySelector('.main-nav');
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 10, 15, 0.98)';
        } else {
            header.style.background = 'rgba(10, 10, 15, 0.95)';
        }
    });
    
    // Mobile menu toggle
    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileToggle.innerHTML = nav.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }
}

// ========================================
// Hero Slider
// ========================================

function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const navBtns = document.querySelectorAll('.hero-nav-btn');
    let currentSlide = 0;
    
    if (slides.length === 0) return;
    
    // Show first slide
    slides[0].classList.add('active');
    navBtns[0].classList.add('active');
    
    // Auto slide
    let slideInterval = setInterval(nextSlide, 6000);
    
    // Pause on hover
    const slider = document.querySelector('.hero-slider');
    if (slider) {
        slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 6000);
        });
    }
    
    // Navigation buttons
    navBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            goToSlide(index);
            resetInterval();
        });
    });
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }
    
    function goToSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        navBtns.forEach(btn => btn.classList.remove('active'));
        
        slides[index].classList.add('active');
        navBtns[index].classList.add('active');
        currentSlide = index;
    }
    
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 6000);
    }
}

// ========================================
// Categories
// ========================================

function initCategories() {
    const categoriesGrid = document.querySelector('.categories-grid');
    if (!categoriesGrid) return;
    
    categories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.innerHTML = `
            <div class="category-icon ${category.id}">
                <i class="fas ${category.icon}"></i>
            </div>
            <h3>${category.name}</h3>
            <p>${category.count} Jeux</p>
            <a href="shop.html?category=${category.id}" class="btn btn-sm">Voir plus</a>
        `;
        categoriesGrid.appendChild(categoryCard);
        
        // Add animation
        categoryCard.style.animationDelay = `${categories.indexOf(category) * 0.1}s`;
    });
}

// ========================================
// Featured Games
// ========================================

function initFeaturedGames() {
    const gamesGrid = document.getElementById('featured-games');
    if (!gamesGrid) return;
    
    featuredGames.forEach(game => {
        const gameCard = createGameCard(game);
        gamesGrid.appendChild(gameCard);
    });
    
    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            filterGames(filter);
        });
    });
}

function filterGames(filter) {
    const gamesGrid = document.getElementById('featured-games');
    if (!gamesGrid) return;
    
    gamesGrid.innerHTML = '';
    
    let filteredGames = [];
    
    switch (filter) {
        case 'new':
            filteredGames = featuredGames.filter(g => g.isNew);
            break;
        case 'sale':
            filteredGames = featuredGames.filter(g => g.isOnSale);
            break;
        case 'top':
            filteredGames = topSellers.map(t => t.game);
            break;
        default:
            filteredGames = featuredGames;
    }
    
    filteredGames.forEach(game => {
        const gameCard = createGameCard(game);
        gamesGrid.appendChild(gameCard);
    });
}

// ========================================
// New Releases
// ========================================

function initNewReleases() {
    const carousel = document.getElementById('new-releases-carousel');
    if (!carousel) return;
    
    newReleases.forEach(game => {
        const carouselCard = document.createElement('div');
        carouselCard.className = 'carousel-card';
        carouselCard.innerHTML = createGameCard(game).innerHTML;
        carousel.appendChild(carouselCard);
    });
    
    // Add carousel navigation if needed
    initCarouselNavigation('new-releases-carousel');
}

// ========================================
// Top Sellers
// ========================================

function initTopSellers() {
    const grid = document.getElementById('top-sellers-grid');
    if (!grid) return;
    
    topSellers.forEach(topSeller => {
        const sellerCard = document.createElement('div');
        sellerCard.className = 'top-seller-card';
        sellerCard.innerHTML = `
            <div class="top-seller-rank">${topSeller.rank}</div>
            <div class="top-seller-info">
                <h3 class="top-seller-title">${topSeller.game.title}</h3>
                <div class="top-seller-rating">
                    <div class="rating-stars">
                        ${generateRatingStars(topSeller.game.rating)}
                    </div>
                    <span class="rating-count">(${topSeller.game.rating}/5 - ${topSeller.game.reviewCount} avis)</span>
                </div>
                <div class="top-seller-price">${formatPrice(topSeller.game.price)}</div>
                <div class="top-seller-sales">${topSeller.sales} ventes</div>
            </div>
        `;
        grid.appendChild(sellerCard);
    });
}

// ========================================
// Promo Timer
// ========================================

function initPromoTimer() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
    
    // Set a target date (2 days from now for demo)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 2);
    targetDate.setHours(targetDate.getHours() + 14);
    targetDate.setMinutes(targetDate.getMinutes() + 35);
    targetDate.setSeconds(targetDate.getSeconds() + 22);
    
    function updateTimer() {
        const now = new Date();
        const diff = targetDate - now;
        
        if (diff <= 0) {
            // Timer expired
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// ========================================
// Newsletter
// ========================================

function initNewsletter() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        
        if (email) {
            // Simulate subscription
            alert('Merci pour votre inscription ! Vous allez recevoir nos dernières offres.');
            form.reset();
        }
    });
}

// ========================================
// Scroll Effects
// ========================================

function initScrollEffects() {
    const backToTop = document.getElementById('back-to-top');
    
    // Back to top button
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.game-card, .category-card, .top-seller-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.85) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initial animation
    document.querySelectorAll('.game-card, .category-card, .top-seller-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
}

// ========================================
// Mobile Menu
// ========================================

function initMobileMenu() {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const nav = document.querySelector('.main-nav');
    
    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileToggle.innerHTML = nav.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }
}

// ========================================
// Search
// ========================================

function initSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
            }
        }
    });
    
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
            }
        });
    }
}

// ========================================
// Cart Functions
// ========================================

function loadCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = count;
    }
}

function addToCart(gameId, quantity = 1) {
    const game = games.find(g => g.id === gameId);
    if (!game) return false;
    
    const existingItem = cart.find(item => item.id === gameId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: game.id,
            title: game.title,
            price: game.price,
            image: game.image,
            quantity: quantity,
            maxQuantity: 10
        });
    }
    
    saveCart();
    loadCartCount();
    return true;
}

function removeFromCart(gameId) {
    cart = cart.filter(item => item.id !== gameId);
    saveCart();
    loadCartCount();
}

function updateCartQuantity(gameId, quantity) {
    const item = cart.find(item => item.id === gameId);
    if (item) {
        item.quantity = Math.max(1, Math.min(quantity, item.maxQuantity));
        saveCart();
        loadCartCount();
    }
}

function clearCart() {
    cart = [];
    saveCart();
    loadCartCount();
}

function saveCart() {
    localStorage.setItem('nexusGamesCart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('nexusGamesCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// ========================================
// Wishlist Functions
// ========================================

function addToWishlist(gameId) {
    if (!wishlist.includes(gameId)) {
        wishlist.push(gameId);
        saveWishlist();
        return true;
    }
    return false;
}

function removeFromWishlist(gameId) {
    wishlist = wishlist.filter(id => id !== gameId);
    saveWishlist();
}

function saveWishlist() {
    localStorage.setItem('nexusGamesWishlist', JSON.stringify(wishlist));
}

function loadWishlist() {
    const savedWishlist = localStorage.getItem('nexusGamesWishlist');
    if (savedWishlist) {
        wishlist = JSON.parse(savedWishlist);
    }
}

// ========================================
// Utility Functions
// ========================================

function formatPrice(price) {
    return price.toFixed(2).replace('.', ',') + ' €';
}

function generateRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function createGameCard(game) {
    const gameCard = document.createElement('div');
    gameCard.className = 'game-card';
    
    const isNew = game.isNew ? '<span class="badge new">Nouveau</span>' : '';
    const isSale = game.isOnSale ? `<span class="badge sale">-${game.discount}%</span>` : '';
    const oldPrice = game.oldPrice ? `<span class="old-price">${formatPrice(game.oldPrice)}</span>` : '';
    
    // Platform icons
    const platformIcons = game.platform.map(p => {
        const platform = platforms.find(pl => pl.id === p);
        return platform ? `<i class="fab ${platform.icon}"></i>` : '';
    }).join('');
    
    gameCard.innerHTML = `
        ${isNew}
        ${isSale}
        <div class="game-image">
            <img src="${game.image}" alt="${game.title}">
            <div class="game-actions">
                <button class="game-action-btn" onclick="addToWishlist(${game.id})" title="Ajouter aux favoris">
                    <i class="far fa-heart"></i>
                </button>
                <button class="game-action-btn" onclick="window.location.href='product.html?id=${game.id}'" title="Voir les détails">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        </div>
        <div class="game-info">
            <div class="game-category">
                ${game.category.map(c => `<span>${categories.find(cat => cat.id === c)?.name || c}</span>`).join('')}
            </div>
            <h3 class="game-title">
                <a href="product.html?id=${game.id}">${game.title}</a>
            </h3>
            <div class="game-rating">
                <div class="rating-stars">
                    ${generateRatingStars(game.rating)}
                </div>
                <span class="rating-count">(${game.rating}/5 - ${game.reviewCount} avis)</span>
            </div>
            <div class="game-price">
                <span class="current-price">${formatPrice(game.price)}</span>
                ${oldPrice}
            </div>
            <div class="game-meta">
                <div class="game-platforms">
                    ${platformIcons}
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${game.id}); event.stopPropagation()">
                    <i class="fas fa-shopping-cart"></i> Ajouter
                </button>
            </div>
        </div>
    `;
    
    return gameCard;
}

function initCarouselNavigation(carouselId) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    
    const prevBtn = document.createElement('button');
    prevBtn.className = 'carousel-nav-btn';
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'carousel-nav-btn';
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    
    const navContainer = document.createElement('div');
    navContainer.className = 'carousel-nav';
    navContainer.appendChild(prevBtn);
    navContainer.appendChild(nextBtn);
    
    carousel.parentNode.insertBefore(navContainer, carousel.nextSibling);
    
    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -320, behavior: 'smooth' });
    });
    
    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: 320, behavior: 'smooth' });
    });
}

// Load cart from localStorage
loadCart();
loadWishlist();

// Make functions available globally
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.clearCart = clearCart;
window.addToWishlist = (gameId) => {
    addToWishlist(gameId);
    // Toggle heart icon
    const btn = event.target.closest('.game-action-btn');
    if (btn) {
        const icon = btn.querySelector('i');
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
        }
    }
};
