document.addEventListener('DOMContentLoaded', async () => {
    const productGrid = document.querySelector('.shop-grid');
    if (!productGrid) return;
    
    // Determine category from URL parameter (if any)
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    let fetchUrl = '/api/products';
    if (category) {
        fetchUrl += `?category=${category}`;
    }

    try {
        productGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center;">Loading products...</p>';
        const response = await fetch(fetchUrl);
        const products = await response.json();
        
        productGrid.innerHTML = '';
        
        if (products.length === 0) {
            productGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center;">No products found.</p>';
            return;
        }

        products.forEach(product => {
            const article = document.createElement('article');
            article.className = 'product-card';
            article.innerHTML = `
                <div class="product-image-wrapper">
                    <img src="${product.imageUrl}" alt="${product.name}" class="product-img primary-img">
                    <button class="btn-add-cart" aria-label="Add to cart" data-id="${product._id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.imageUrl}">Add to Cart</button>
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                </div>
            `;
            productGrid.appendChild(article);
        });

        // Attach add to cart event listeners for the dynamically generated buttons
        document.querySelectorAll('.btn-add-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productCard = e.target.closest('.product-card');
                const id = e.target.dataset.id;
                const name = e.target.dataset.name;
                const price = parseFloat(e.target.dataset.price);
                const image = e.target.dataset.image;
                
                // Call the globally available addToCart function from cart.js
                if(window.addToCart) {
                    window.addToCart({ id, name, price, image, quantity: 1 });
                }
            });
        });

    } catch (error) {
        console.error('Error fetching products:', error);
        productGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center;">Failed to load products. Please try again later.</p>';
    }
});
