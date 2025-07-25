// Load products from API and display them
function loadProducts() {
  fetch('http://localhost:5000/api/products')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('product-container');
      if (!container) return;

      container.innerHTML = '';

      data.forEach(product => {
        container.innerHTML += `
          <div class="col-md-4">
            <div class="card m-2 shadow-sm">
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">Price: ₹${product.price}</p>
                <button class="btn btn-sm btn-success" onclick="addToCart('${product._id}')">Add to Cart</button>
              </div>
            </div>
          </div>
        `;
      });
    })
    .catch(err => {
      console.error("Error loading products:", err);
      alert("Failed to load products.");
    });
}

// Add product to cart in localStorage
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || {};

  if (cart[productId]) {
    cart[productId] += 1;
  } else {
    cart[productId] = 1;
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Product added to cart!');
}

// Load cart items and show them in cart.html
function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  const container = document.getElementById('cart-container');
  if (!container) return;

  if (Object.keys(cart).length === 0) {
    container.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  container.innerHTML = '<ul class="list-group mb-3">';
  for (const [productId, quantity] of Object.entries(cart)) {
    container.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        Product ID: ${productId}
        <span class="badge bg-primary rounded-pill">Qty: ${quantity}</span>
      </li>
    `;
  }
  container.innerHTML += '</ul>';
}

// Page-specific loader
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  if (path.includes('products.html')) {
    loadProducts();
  } else if (path.includes('cart.html')) {
    loadCart();
  }
});
