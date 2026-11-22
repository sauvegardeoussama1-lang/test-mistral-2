// ========================================
// Nexus Games - Product Page JavaScript
// ========================================

// DOM Content Loaded
window.addEventListener('DOMContentLoaded', () => {
    loadCart();
    loadWishlist();
    initProductPage();
    initProductGallery();
    initProductTabs();
    initQuantitySelector();
    initProductActions();
    initReviews();
    initRelatedProducts();
});

// ========================================
// Product Page Initialization
// ========================================

function initProductPage() {
    // Get product ID from URL
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));
    
    if (!productId) {
        // Redirect to shop if no ID
        window.location.href = 'shop.html';
        return;
    }
    
    const product = games.find(g => g.id === productId);
    
    if (!product) {
        // Product not found, redirect to shop
        window.location.href = 'shop.html';
        return;
    }
    
    // Set current product
    window.currentProduct = product;
    
    // Update page with product data
    updateProductInfo(product);
    updateBreadcrumb(product);
}

// ========================================
// Update Product Info
// ========================================

function updateProductInfo(product) {
    // Product title
    const productTitle = document.getElementById('product-title');
    if (productTitle) {
        productTitle.textContent = product.title;
    }
    
    // Product category in breadcrumb
    const productCategory = document.getElementById('product-category');
    if (productCategory) {
        const category = categories.find(c => product.category.includes(c.id));
        productCategory.textContent = category ? category.name : 'Jeux';
    }
    
    // Product category display
    const productCategoryDisplay = document.getElementById('product-category-display');
    if (productCategoryDisplay) {
        const categoryNames = product.category.map(c => {
            const cat = categories.find(cat => cat.id === c);
            return cat ? cat.name : c;
        });
        productCategoryDisplay.textContent = categoryNames.join(', ');
    }
    
    // Product badges
    const badgeSale = document.getElementById('product-badge-sale');
    const badgeNew = document.getElementById('product-badge-new');
    
    if (badgeSale) {
        if (product.isOnSale) {
            badgeSale.textContent = `-${product.discount}%`;
            badgeSale.style.display = 'inline-block';
        } else {
            badgeSale.style.display = 'none';
        }
    }
    
    if (badgeNew) {
        if (product.isNew) {
            badgeNew.style.display = 'inline-block';
        } else {
            badgeNew.style.display = 'none';
        }
    }
    
    // Product image
    const mainImage = document.getElementById('main-product-image');
    if (mainImage && product.images && product.images.length > 0) {
        mainImage.src = product.images[0];
    }
    
    // Thumbnails
    const thumbnailGallery = document.querySelector('.thumbnail-gallery');
    if (thumbnailGallery && product.images) {
        thumbnailGallery.innerHTML = '';
        product.images.forEach((img, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = `thumbnail-item ${index === 0 ? 'active' : ''}`;
            thumbnail.innerHTML = `<img src="${img}" alt="Thumbnail ${index + 1}">`;
            thumbnail.addEventListener('click', () => {
                // Update main image
                mainImage.src = img;
                
                // Update active thumbnail
                document.querySelectorAll('.thumbnail-item').forEach(t => t.classList.remove('active'));
                thumbnail.classList.add('active');
            });
            thumbnailGallery.appendChild(thumbnail);
        });
    }
    
    // Product developer
    const productDeveloper = document.getElementById('product-developer');
    if (productDeveloper) {
        productDeveloper.textContent = product.developer;
    }
    
    // Product publisher
    const productPublisher = document.getElementById('product-publisher');
    if (productPublisher) {
        productPublisher.textContent = product.publisher;
    }
    
    // Product release date
    const productReleaseDate = document.getElementById('product-release-date');
    if (productReleaseDate) {
        productReleaseDate.textContent = new Date(product.releaseDate).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    // Product description
    const productDescription = document.getElementById('product-description-text');
    if (productDescription) {
        productDescription.textContent = product.description;
    }
    
    // Product features
    const productFeaturesList = document.getElementById('product-features-list');
    if (productFeaturesList && product.features) {
        productFeaturesList.innerHTML = product.features.map(feature => 
            `<li><i class="fas fa-check-circle"></i> ${feature}</li>`
        ).join('');
    }
    
    // Product pricing
    const currentPrice = document.getElementById('product-current-price');
    const oldPrice = document.getElementById('product-old-price');
    const savings = document.getElementById('product-savings');
    
    if (currentPrice) {
        currentPrice.textContent = formatPrice(product.price);
    }
    
    if (oldPrice) {
        if (product.oldPrice) {
            oldPrice.textContent = formatPrice(product.oldPrice);
            oldPrice.style.display = 'inline';
        } else {
            oldPrice.style.display = 'none';
        }
    }
    
    if (savings) {
        if (product.oldPrice) {
            const savingAmount = product.oldPrice - product.price;
            savings.textContent = formatPrice(savingAmount);
        } else {
            savings.textContent = '0,00 €';
        }
    }
    
    // Product story
    const productStory = document.getElementById('product-story');
    if (productStory) {
        productStory.textContent = product.story || product.description;
    }
    
    // Product gameplay
    const productGameplay = document.getElementById('product-gameplay');
    if (productGameplay) {
        productGameplay.textContent = product.gameplay || product.description;
    }
    
    // System requirements
    if (product.systemRequirements) {
        updateSystemRequirements(product.systemRequirements);
    }
    
    // Check if product is in wishlist
    updateWishlistButton();
}

// ========================================
// Update Breadcrumb
// ========================================

function updateBreadcrumb(product) {
    const category = categories.find(c => product.category.includes(c.id));
    const categoryName = category ? category.name : 'Jeux';
    
    const breadcrumbCategory = document.getElementById('product-category');
    if (breadcrumbCategory) {
        breadcrumbCategory.textContent = categoryName;
    }
}

// ========================================
// Product Gallery
// ========================================

function initProductGallery() {
    const mainImage = document.getElementById('main-product-image');
    const thumbnailItems = document.querySelectorAll('.thumbnail-item');
    
    if (!mainImage) return;
    
    // Click on main image to zoom
    const zoomBtn = document.getElementById('zoom-image');
    const modal = document.getElementById('product-modal');
    const modalImg = modal?.querySelector('img');
    
    if (zoomBtn && modal && modalImg) {
        zoomBtn.addEventListener('click', () => {
            modalImg.src = mainImage.src;
            modal.style.display = 'flex';
        });
    }
    
    // Close modal
    const modalClose = document.querySelector('.modal-close');
    if (modalClose && modal) {
        modalClose.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    // Close modal on click outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // Thumbnail click handlers
    thumbnailItems.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            const img = thumbnail.querySelector('img');
            if (img && mainImage) {
                mainImage.src = img.src;
            }
            
            // Update active thumbnail
            thumbnailItems.forEach(t => t.classList.remove('active'));
            thumbnail.classList.add('active');
        });
    });
}

// ========================================
// Quantity Selector
// ========================================

function initQuantitySelector() {
    const decreaseBtn = document.getElementById('decrease-qty');
    const increaseBtn = document.getElementById('increase-qty');
    const quantityInput = document.getElementById('product-quantity');
    
    if (!decreaseBtn || !increaseBtn || !quantityInput) return;
    
    decreaseBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });
    
    increaseBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
    });
}

// ========================================
// Product Actions
// ========================================

function initProductActions() {
    const addToCartBtn = document.getElementById('add-to-cart');
    const buyNowBtn = document.getElementById('buy-now');
    const wishlistBtn = document.getElementById('add-to-wishlist');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const quantity = parseInt(document.getElementById('product-quantity')?.value || 1);
            const productId = window.currentProduct?.id;
            
            if (productId) {
                addToCart(productId, quantity);
                alert('Produit ajouté au panier !');
                loadCartCount();
            }
        });
    }
    
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', () => {
            const quantity = parseInt(document.getElementById('product-quantity')?.value || 1);
            const productId = window.currentProduct?.id;
            
            if (productId) {
                addToCart(productId, quantity);
                window.location.href = 'cart.html';
            }
        });
    }
    
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', () => {
            const productId = window.currentProduct?.id;
            if (productId) {
                toggleWishlist(productId);
            }
        });
    }
}

function toggleWishlist(productId) {
    const btn = document.getElementById('add-to-wishlist');
    const icon = btn?.querySelector('i');
    
    if (wishlist.includes(productId)) {
        removeFromWishlist(productId);
        if (icon) {
            icon.classList.remove('fas');
            icon.classList.add('far');
        }
        alert('Retiré des favoris !');
    } else {
        addToWishlist(productId);
        if (icon) {
            icon.classList.remove('far');
            icon.classList.add('fas');
        }
        alert('Ajouté aux favoris !');
    }
    
    updateWishlistButton();
}

function updateWishlistButton() {
    const btn = document.getElementById('add-to-wishlist');
    const icon = btn?.querySelector('i');
    const productId = window.currentProduct?.id;
    
    if (productId && icon) {
        if (wishlist.includes(productId)) {
            icon.classList.remove('far');
            icon.classList.add('fas');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
        }
    }
}

// ========================================
// Product Tabs
// ========================================

function initProductTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    if (tabBtns.length === 0 || tabPanels.length === 0) return;
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            
            // Update active button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update active panel
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === `${tabId}-tab`) {
                    panel.classList.add('active');
                }
            });
        });
    });
}

// ========================================
// System Requirements
// ========================================

function updateSystemRequirements(requirements) {
    // Windows requirements
    if (requirements.windows) {
        const minWindows = document.getElementById('system-min-windows');
        const recommendedWindows = document.getElementById('system-recommended-windows');
        
        if (minWindows && requirements.windows.min) {
            minWindows.innerHTML = `
                <li><strong>OS:</strong> ${requirements.windows.min.os}</li>
                <li><strong>Processeur:</strong> ${requirements.windows.min.processor}</li>
                <li><strong>Mémoire:</strong> ${requirements.windows.min.memory}</li>
                <li><strong>Graphiques:</strong> ${requirements.windows.min.graphics}</li>
                <li><strong>Stockage:</strong> ${requirements.windows.min.storage}</li>
            `;
        }
        
        if (recommendedWindows && requirements.windows.recommended) {
            recommendedWindows.innerHTML = `
                <li><strong>OS:</strong> ${requirements.windows.recommended.os}</li>
                <li><strong>Processeur:</strong> ${requirements.windows.recommended.processor}</li>
                <li><strong>Mémoire:</strong> ${requirements.windows.recommended.memory}</li>
                <li><strong>Graphiques:</strong> ${requirements.windows.recommended.graphics}</li>
                <li><strong>Stockage:</strong> ${requirements.windows.recommended.storage}</li>
            `;
        }
    }
    
    // PS5 requirements
    if (requirements.ps5) {
        const ps5El = document.getElementById('system-ps5');
        if (ps5El) {
            ps5El.innerHTML = `
                <li><strong>Console:</strong> ${requirements.ps5.console}</li>
                <li><strong>Stockage:</strong> ${requirements.ps5.storage}</li>
                <li><strong>Fonctionnalités:</strong> ${requirements.ps5.features.join(', ')}</li>
            `;
        }
    }
    
    // Xbox requirements
    if (requirements.xbox) {
        const xboxEl = document.getElementById('system-xbox');
        if (xboxEl) {
            xboxEl.innerHTML = `
                <li><strong>Console:</strong> ${requirements.xbox.console}</li>
                <li><strong>Stockage:</strong> ${requirements.xbox.storage}</li>
                <li><strong>Fonctionnalités:</strong> ${requirements.xbox.features.join(', ')}</li>
            `;
        }
    }
}

// ========================================
// Reviews
// ========================================

function initReviews() {
    const reviewsList = document.getElementById('reviews-list');
    if (!reviewsList) return;
    
    const product = window.currentProduct;
    if (!product || !product.reviews) return;
    
    // Clear existing reviews
    reviewsList.innerHTML = '';
    
    // Add reviews
    product.reviews.forEach(review => {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        
        reviewItem.innerHTML = `
            <div class="review-header">
                <div class="review-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="review-info">
                    <h4>${review.user}</h4>
                    <span>${new Date(review.date).toLocaleDateString('fr-FR')}</span>
                </div>
                <div class="review-rating">
                    <div class="rating-stars">
                        ${generateRatingStars(review.rating)}
                    </div>
                </div>
            </div>
            <div class="review-content">
                <p>${review.comment}</p>
            </div>
            <div class="review-actions">
                <button><i class="fas fa-thumbs-up"></i> Utile</button>
                <button><i class="fas fa-flag"></i> Signaler</button>
            </div>
        `;
        
        reviewsList.appendChild(reviewItem);
    });
}

// ========================================
// Related Products
// ========================================

function initRelatedProducts() {
    const relatedProducts = document.getElementById('related-products');
    if (!relatedProducts) return;
    
    const product = window.currentProduct;
    if (!product) return;
    
    // Get related games (same category or platform)
    const relatedGames = games.filter(game => 
        game.id !== product.id &&
        (game.category.some(c => product.category.includes(c)) ||
         game.platform.some(p => product.platform.includes(p)))
    ).slice(0, 4);
    
    relatedGames.forEach(game => {
        const gameCard = createGameCard(game);
        relatedProducts.appendChild(gameCard);
    });
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

// Make functions available globally
window.addToCart = (gameId, quantity = 1) => {
    addToCart(gameId, quantity);
    alert('Produit ajouté au panier !');
    loadCartCount();
};

window.addToWishlist = (gameId) => {
    addToWishlist(gameId);
    alert('Ajouté aux favoris !');
    updateWishlistButton();
};
