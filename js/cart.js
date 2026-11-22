// ========================================
// Nexus Games - Cart JavaScript
// ========================================

// DOM Content Loaded
window.addEventListener('DOMContentLoaded', () => {
    loadCart();
    loadWishlist();
    initCartPage();
    initCartSummary();
    initPromoCode();
    initCrossSell();
});

// ========================================
// Cart Page Initialization
// ========================================

function initCartPage() {
    const cartBody = document.getElementById('cart-body');
    const emptyCart = document.getElementById('empty-cart');
    
    if (!cartBody) return;
    
    if (cart.length === 0) {
        if (emptyCart) {
            emptyCart.style.display = 'flex';
        }
        return;
    }
    
    if (emptyCart) {
        emptyCart.style.display = 'none';
    }
    
    // Clear cart body
    cartBody.innerHTML = '';
    
    // Add each cart item
    cart.forEach(item => {
        const cartItem = createCartItem(item);
        cartBody.appendChild(cartItem);
    });
    
    // Initialize event listeners
    initCartActions();
}

// ========================================
// Create Cart Item
// ========================================

function createCartItem(item) {
    const game = games.find(g => g.id === item.id);
    if (!game) return null;
    
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.dataset.id = item.id;
    
    cartItem.innerHTML = `
        <div class="cart-col product">
            <div class="product-image">
                <img src="${game.image}" alt="${game.title}">
            </div>
            <div class="product-details">
                <h4 class="product-name">
                    <a href="product.html?id=${game.id}">${game.title}</a>
                </h4>
                <div class="product-options">
                    ${game.platform.map(p => {
                        const platform = platforms.find(pl => pl.id === p);
                        return platform ? `<i class="fab ${platform.icon}"></i>` : '';
                    }).join('')}
                </div>
            </div>
        </div>
        <div class="cart-col price">
            ${formatPrice(item.price)}
        </div>
        <div class="cart-col quantity">
            <div class="cart-quantity">
                <button class="qty-btn minus" onclick="updateCartItem(${item.id}, ${item.quantity - 1})">
                    <i class="fas fa-minus"></i>
                </button>
                <input type="number" min="1" max="${item.maxQuantity}" value="${item.quantity}" 
                       onchange="updateCartItem(${item.id}, this.value)">
                <button class="qty-btn plus" onclick="updateCartItem(${item.id}, ${item.quantity + 1})">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        </div>
        <div class="cart-col total">
            ${formatPrice(item.price * item.quantity)}
        </div>
        <div class="cart-col actions">
            <button class="remove-item" onclick="removeCartItem(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    return cartItem;
}

// ========================================
// Cart Actions
// ========================================

function initCartActions() {
    // Clear cart button
    const clearCartBtn = document.getElementById('clear-cart');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            if (confirm('Êtes-vous sûr de vouloir vider votre panier ?')) {
                clearCart();
                initCartPage();
                initCartSummary();
            }
        });
    }
    
    // Save cart button
    const saveCartBtn = document.getElementById('save-cart');
    if (saveCartBtn) {
        saveCartBtn.addEventListener('click', () => {
            alert('Votre panier a été sauvegardé !');
        });
    }
    
    // Checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Votre panier est vide !');
                return;
            }
            window.location.href = '#';
            alert('Redirection vers la page de paiement...');
        });
    }
}

function updateCartItem(itemId, quantity) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        const newQuantity = Math.max(1, Math.min(quantity, item.maxQuantity));
        item.quantity = newQuantity;
        saveCart();
        initCartPage();
        initCartSummary();
    }
}

function removeCartItem(itemId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
        cart = cart.filter(item => item.id !== itemId);
        saveCart();
        initCartPage();
        initCartSummary();
        loadCartCount();
    }
}

// ========================================
// Cart Summary
// ========================================

function initCartSummary() {
    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const discountEl = document.getElementById('discount');
    const totalEl = document.getElementById('total');
    
    if (!subtotalEl || !totalEl) return;
    
    // Calculate subtotal
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    subtotalEl.textContent = formatPrice(subtotal);
    
    // Shipping (free for now)
    if (shippingEl) {
        shippingEl.textContent = 'Gratuit';
    }
    
    // Discount (from promo code)
    if (discountEl) {
        const discount = getPromoDiscount();
        discountEl.textContent = discount > 0 ? `-${formatPrice(discount)}` : '0,00 €';
    }
    
    // Total
    const discount = getPromoDiscount();
    const total = subtotal - discount;
    totalEl.textContent = formatPrice(total);
}

// ========================================
// Promo Code
// ========================================

function initPromoCode() {
    const promoInput = document.getElementById('promo-input');
    const applyBtn = document.getElementById('apply-promo');
    
    if (!promoInput || !applyBtn) return;
    
    applyBtn.addEventListener('click', () => {
        const code = promoInput.value.trim().toUpperCase();
        
        if (code) {
            applyPromoCode(code);
        }
    });
    
    promoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const code = promoInput.value.trim().toUpperCase();
            if (code) {
                applyPromoCode(code);
            }
        }
    });
}

// Valid promo codes
const promoCodes = [
    { code: 'NEXUS20', discount: 20, type: 'percent' },
    { code: 'SAVE10', discount: 10, type: 'percent' },
    { code: 'FREESHIP', discount: 0, type: 'free-shipping' },
    { code: 'GAMEON', discount: 15, type: 'percent' }
];

let activePromo = null;

function applyPromoCode(code) {
    const promo = promoCodes.find(p => p.code === code);
    
    if (promo) {
        activePromo = promo;
        alert(`Code promo "${code}" appliqué avec succès !`);
        initCartSummary();
    } else {
        alert('Code promo invalide. Veuillez réessayer.');
    }
}

function getPromoDiscount() {
    if (!activePromo) return 0;
    
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    if (activePromo.type === 'percent') {
        return subtotal * (activePromo.discount / 100);
    }
    
    return 0;
}

// ========================================
// Cross-sell Products
// ========================================

function initCrossSell() {
    const crossSellGrid = document.getElementById('cross-sell-products');
    if (!crossSellGrid) return;
    
    // Get random games that are not in cart
    const availableGames = games.filter(game => !cart.some(item => item.id === game.id));
    const randomGames = availableGames.sort(() => 0.5 - Math.random()).slice(0, 4);
    
    randomGames.forEach(game => {
        const gameCard = createGameCard(game);
        crossSellGrid.appendChild(gameCard);
    });
}

// ========================================
// Cart Utility Functions
// ========================================

function formatPrice(price) {
    return price.toFixed(2).replace('.', ',') + ' €';
}

// Make functions available globally
window.updateCartItem = updateCartItem;
window.removeCartItem = removeCartItem;
