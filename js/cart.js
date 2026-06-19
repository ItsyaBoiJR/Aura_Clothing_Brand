// Cart Logic for Aura Clothing

const State = {
    cart: JSON.parse(localStorage.getItem('aura_cart')) || [],
    discountApplied: false,
    discountAmount: 0
};

function saveCart() {
    localStorage.setItem('aura_cart', JSON.stringify(State.cart));
}

function initCart() {
    renderCart();
    updateCartCount();
    
    // Toggle cart drawer
    document.querySelectorAll('.cart-btn').forEach(btn => {
        btn.addEventListener('click', () => toggleCart(true));
    });
    
    document.getElementById('cartOverlay').addEventListener('click', () => toggleCart(false));
    
    // Add to cart buttons
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            
            // Extract data securely depending on where the button is (shop or index)
            const id = e.target.dataset.id || productCard.querySelector('.product-title').innerText.replace(/\s+/g, '-').toLowerCase();
            const name = e.target.dataset.name || productCard.querySelector('.product-title').innerText;
            const priceText = productCard.querySelector('.product-price').innerText;
            const price = parseFloat(e.target.dataset.price || priceText.replace('$', ''));
            const image = e.target.dataset.image || productCard.querySelector('.primary-img').src;
            
            addToCart({ id, name, price, image, quantity: 1 });
        });
    });
}

function toggleCart(open) {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');
    if (open) {
        drawer.classList.add('open');
        overlay.classList.add('open');
        renderCart();
    } else {
        drawer.classList.remove('open');
        overlay.classList.remove('open');
    }
}

// Make toggleCart globally available if it's called from inline HTML (e.g. onclick)
window.toggleCart = toggleCart;

function addToCart(product) {
    const existing = State.cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        State.cart.push(product);
    }
    saveCart();
    updateCartCount();
    toggleCart(true);
}

function updateQuantity(id, delta) {
    const item = State.cart.find(item => item.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            State.cart = State.cart.filter(i => i.id !== id);
        }
        saveCart();
        renderCart();
        updateCartCount();
    }
}
window.updateQuantity = updateQuantity;

function removeItem(id) {
    State.cart = State.cart.filter(i => i.id !== id);
    saveCart();
    renderCart();
    updateCartCount();
}
window.removeItem = removeItem;

function updateCartCount() {
    const totalItems = State.cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.innerText = totalItems;
        // Optional: add a pop animation class
        el.classList.add('pop');
        setTimeout(() => el.classList.remove('pop'), 300);
    });
}

function applyDiscount(code) {
    if (code.trim().toUpperCase() === 'AURA10') {
        State.discountApplied = true;
        State.discountAmount = 10;
        renderCart();
    } else {
        alert('Invalid discount code. Try AURA10');
    }
}
window.applyDiscount = applyDiscount;

function renderCart() {
    const drawer = document.getElementById('cartDrawer');
    
    let subtotal = State.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let total = subtotal;
    let discountHTML = '';
    
    if (State.discountApplied) {
        const discountVal = (subtotal * (State.discountAmount / 100));
        total -= discountVal;
        discountHTML = `
            <div class="cart-summary-row discount">
                <span>Discount (${State.discountAmount}%)</span>
                <span>-$${discountVal.toFixed(2)}</span>
            </div>
        `;
    }

    const itemsHTML = State.cart.length === 0 
        ? `<div class="empty-cart">
            <p>Your cart is empty.</p>
            <button class="btn btn-primary" onclick="toggleCart(false)">Continue Shopping</button>
           </div>`
        : State.cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <div class="cart-item-actions">
                        <div class="quantity-controls">
                            <button onclick="updateQuantity('${item.id}', -1)" aria-label="Decrease quantity">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="updateQuantity('${item.id}', 1)" aria-label="Increase quantity">+</button>
                        </div>
                        <button class="btn-remove" onclick="removeItem('${item.id}')" aria-label="Remove item">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

    drawer.innerHTML = `
        <div class="cart-header">
            <h3>Your Cart</h3>
            <button class="btn-close-cart" onclick="toggleCart(false)" aria-label="Close cart">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        </div>
        <div class="cart-items">
            ${itemsHTML}
        </div>
        ${State.cart.length > 0 ? `
        <div class="cart-footer">
            <div class="discount-code">
                <input type="text" id="discountInput" placeholder="Promo code (try AURA10)">
                <button class="btn btn-secondary" onclick="applyDiscount(document.getElementById('discountInput').value)">Apply</button>
            </div>
            <div class="cart-summary">
                <div class="cart-summary-row">
                    <span>Subtotal</span>
                    <span>$${subtotal.toFixed(2)}</span>
                </div>
                ${discountHTML}
                <div class="cart-summary-row total">
                    <span>Total</span>
                    <span>$${total.toFixed(2)}</span>
                </div>
            </div>
            <button class="btn btn-primary btn-block">Checkout</button>
        </div>
        ` : ''}
    `;
}

document.addEventListener('DOMContentLoaded', initCart);
