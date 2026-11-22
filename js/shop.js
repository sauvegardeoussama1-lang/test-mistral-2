// ========================================
// Nexus Games - Shop Page JavaScript
// ========================================

// DOM Content Loaded
window.addEventListener('DOMContentLoaded', () => {
    loadCart();
    loadWishlist();
    initShopFilters();
    initShopProducts();
    initSortOptions();
    initViewToggle();
    initPagination();
});

// ========================================
// Shop Filters
// ========================================

function initShopFilters() {
    // Category filters
    const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            // If "all" is checked, uncheck others
            if (checkbox.id === 'category-all' && checkbox.checked) {
                categoryCheckboxes.forEach(cb => {
                    if (cb.id !== 'category-all') {
                        cb.checked = false;
                    }
                });
            } else if (checkbox.checked) {
                // If any other is checked, uncheck "all"
                document.getElementById('category-all').checked = false;
            }
        });
    });
    
    // Platform filters
    const platformCheckboxes = document.querySelectorAll('input[name="platform"]');
    platformCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox.id === 'platform-all' && checkbox.checked) {
                platformCheckboxes.forEach(cb => {
                    if (cb.id !== 'platform-all') {
                        cb.checked = false;
                    }
                });
            } else if (checkbox.checked) {
                document.getElementById('platform-all').checked = false;
            }
        });
    });
    
    // Price range
    const priceRange = document.getElementById('price-range');
    const priceMin = document.getElementById('price-min');
    const priceMax = document.getElementById('price-max');
    
    if (priceRange && priceMin && priceMax) {
        priceRange.addEventListener('input', () => {
            const maxPrice = 200;
            const value = priceRange.value;
            priceMax.textContent = `${value} €`;
        });
    }
    
    // Rating filters
    const ratingCheckboxes = document.querySelectorAll('input[name="rating"]');
    ratingCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox.id === 'rating-all' && checkbox.checked) {
                ratingCheckboxes.forEach(cb => {
                    if (cb.id !== 'rating-all') {
                        cb.checked = false;
                    }
                });
            } else if (checkbox.checked) {
                document.getElementById('rating-all').checked = false;
            }
        });
    });
    
    // Apply filters button
    const applyBtn = document.getElementById('apply-filters');
    if (applyBtn) {
        applyBtn.addEventListener('click', applyFilters);
    }
    
    // Also apply filters when any filter changes (with debounce)
    let filterTimeout;
    const filterInputs = document.querySelectorAll('.filter-group input, .filter-group select');
    filterInputs.forEach(input => {
        input.addEventListener('change', () => {
            clearTimeout(filterTimeout);
            filterTimeout = setTimeout(applyFilters, 500);
        });
    });
}

// ========================================
// Apply Filters
// ========================================

function applyFilters() {
    // Get filter values
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
        .map(cb => cb.id.replace('category-', ''));
    
    const selectedPlatforms = Array.from(document.querySelectorAll('input[name="platform"]:checked'))
        .map(cb => cb.id.replace('platform-', ''));
    
    const maxPrice = document.getElementById('price-range')?.value || 200;
    
    const selectedRatings = Array.from(document.querySelectorAll('input[name="rating"]:checked'))
        .map(cb => cb.id.replace('rating-', ''));
    
    const saleFilter = document.querySelector('input[name="sale"]:checked')?.id || 'sale-all';
    
    // Filter games
    let filteredGames = [...games];
    
    // Category filter
    if (!selectedCategories.includes('all')) {
        filteredGames = filteredGames.filter(game => 
            game.category.some(cat => selectedCategories.includes(cat))
        );
    }
    
    // Platform filter
    if (!selectedPlatforms.includes('all')) {
        filteredGames = filteredGames.filter(game => 
            game.platform.some(platform => selectedPlatforms.includes(platform))
        );
    }
    
    // Price filter
    filteredGames = filteredGames.filter(game => game.price <= maxPrice);
    
    // Rating filter
    if (!selectedRatings.includes('all')) {
        filteredGames = filteredGames.filter(game => {
            if (selectedRatings.includes('5')) {
                return game.rating >= 4.5;
            }
            if (selectedRatings.includes('4')) {
                return game.rating >= 3.5 && game.rating < 4.5;
            }
            if (selectedRatings.includes('3')) {
                return game.rating >= 3 && game.rating < 3.5;
            }
            return true;
        });
    }
    
    // Sale filter
    if (saleFilter === 'sale-only') {
        filteredGames = filteredGames.filter(game => game.isOnSale);
    }
    
    // Update products display
    currentFilteredGames = filteredGames;
    currentPage = 1;
    initShopProducts();
    updateProductsCount();
}

// ========================================
// Shop Products
// ========================================

let currentFilteredGames = [...games];
let currentPage = 1;
const itemsPerPage = 12;

function initShopProducts() {
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) return;
    
    // Clear container
    productsContainer.innerHTML = '';
    
    // Get current page items
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = currentFilteredGames.slice(startIndex, endIndex);
    
    // Add products
    pageItems.forEach(game => {
        const gameCard = createGameCard(game);
        productsContainer.appendChild(gameCard);
    });
    
    // Update pagination
    initPagination();
}

// ========================================
// Sort Options
// ========================================

function initSortOptions() {
    const sortSelect = document.getElementById('sort-by');
    if (!sortSelect) return;
    
    sortSelect.addEventListener('change', () => {
        sortGames(sortSelect.value);
    });
}

function sortGames(sortBy) {
    switch (sortBy) {
        case 'newest':
            currentFilteredGames.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
            break;
        case 'price-asc':
            currentFilteredGames.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            currentFilteredGames.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            currentFilteredGames.sort((a, b) => b.rating - a.rating);
            break;
        case 'sales':
            // Sort by sales (we don't have sales data, so we'll use review count as proxy)
            currentFilteredGames.sort((a, b) => b.reviewCount - a.reviewCount);
            break;
        default: // featured
            // Reset to original order (by ID for now)
            currentFilteredGames.sort((a, b) => a.id - b.id);
    }
    
    currentPage = 1;
    initShopProducts();
}

// ========================================
// View Toggle
// ========================================

function initViewToggle() {
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');
    const productsContainer = document.getElementById('products-container');
    
    if (!gridViewBtn || !listViewBtn || !productsContainer) return;
    
    gridViewBtn.addEventListener('click', () => {
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
        productsContainer.classList.remove('list-view');
        productsContainer.classList.add('grid-view');
    });
    
    listViewBtn.addEventListener('click', () => {
        gridViewBtn.classList.remove('active');
        listViewBtn.classList.add('active');
        productsContainer.classList.remove('grid-view');
        productsContainer.classList.add('list-view');
    });
}

// ========================================
// Pagination
// ========================================

function initPagination() {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;
    
    const pageNumbers = document.getElementById('page-numbers');
    if (!pageNumbers) return;
    
    // Clear existing page numbers
    pageNumbers.innerHTML = '';
    
    // Calculate total pages
    const totalPages = Math.ceil(currentFilteredGames.length / itemsPerPage);
    
    // Previous button
    const prevBtn = document.getElementById('prev-page');
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
        prevBtn.onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                initShopProducts();
                updatePaginationButtons();
            }
        };
    }
    
    // Page numbers
    for (let i = 1; i <= Math.min(totalPages, 5); i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i;
        pageBtn.className = currentPage === i ? 'active' : '';
        pageBtn.onclick = () => {
            currentPage = i;
            initShopProducts();
            updatePaginationButtons();
        };
        pageNumbers.appendChild(pageBtn);
    }
    
    // Next button
    const nextBtn = document.getElementById('next-page');
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages || totalPages === 0;
        nextBtn.onclick = () => {
            if (currentPage < totalPages) {
                currentPage++;
                initShopProducts();
                updatePaginationButtons();
            }
        };
    }
    
    updatePaginationButtons();
}

function updatePaginationButtons() {
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const totalPages = Math.ceil(currentFilteredGames.length / itemsPerPage);
    
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    }
}

function updateProductsCount() {
    const productsCount = document.getElementById('products-count');
    if (productsCount) {
        const start = ((currentPage - 1) * itemsPerPage) + 1;
        const end = Math.min(currentPage * itemsPerPage, currentFilteredGames.length);
        productsCount.textContent = `Affichage de ${start}-${end} sur ${currentFilteredGames.length} jeux`;
    }
}

// ========================================
// URL Parameters Handling
// ========================================

function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return params;
}

function applyUrlParams() {
    const params = getUrlParams();
    
    // Category filter
    if (params.has('category')) {
        const category = params.get('category');
        if (category !== 'all') {
            document.getElementById('category-all').checked = false;
            document.getElementById(`category-${category}`)?.click();
        }
    }
    
    // Search query
    if (params.has('search')) {
        const query = params.get('search');
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.value = query;
            // Filter games by search query
            currentFilteredGames = games.filter(game => 
                game.title.toLowerCase().includes(query.toLowerCase()) ||
                game.description.toLowerCase().includes(query.toLowerCase())
            );
            currentPage = 1;
            initShopProducts();
            updateProductsCount();
        }
    }
    
    // Sale filter
    if (params.has('sale')) {
        if (params.get('sale') === 'true') {
            document.getElementById('sale-only').checked = true;
            applyFilters();
        }
    }
}

// Apply URL params on page load
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(applyUrlParams, 100);
});

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
window.addToCart = (gameId) => {
    addToCart(gameId);
    alert('Jeu ajouté au panier !');
};

window.addToWishlist = (gameId) => {
    addToWishlist(gameId);
    // Toggle heart icon
    const btn = event.target.closest('.game-action-btn');
    if (btn) {
        const icon = btn.querySelector('i');
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            alert('Ajouté aux favoris !');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            removeFromWishlist(gameId);
            alert('Retiré des favoris !');
        }
    }
};
