// Mock Product Data
const products = [
    { id: 1, name: 'Product 1', price: 50, image: 'https://via.placeholder.com/250' },
    { id: 2, name: 'Product 2', price: 75, image: 'https://via.placeholder.com/250' },
    { id: 3, name: 'Product 3', price: 100, image: 'https://via.placeholder.com/250' },
    { id: 4, name: 'Product 4', price: 150, image: 'https://via.placeholder.com/250' }
];

// Cart Array
let cart = [];

// DOM Elements
const productContainer = document.getElementById('products');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

// Render Products
function renderProducts() {
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productContainer.appendChild(productCard);
    });
}

// Add Product to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    renderCart();
}

// Render Cart
function renderCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <p>${item.name} - $${item.price} x ${item.quantity}</p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    cartTotalElement.textContent = `Total: $${total}`;
}

// Remove Item from Cart
function removeFromCart(productId) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
    } else {
        cart = cart.filter(item => item.id !== productId);
    }

    renderCart();
}

// Initialize Product Rendering
renderProducts();
