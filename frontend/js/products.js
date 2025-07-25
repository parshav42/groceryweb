document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Tomatoes", price: 25, image: "https://via.placeholder.com/150?text=Tomatoes" },
    { id: 2, name: "Potatoes", price: 20, image: "https://via.placeholder.com/150?text=Potatoes" },
    { id: 3, name: "Onions", price: 30, image: "https://via.placeholder.com/150?text=Onions" },
    { id: 4, name: "Apples", price: 90, image: "https://via.placeholder.com/150?text=Apples" },
    { id: 5, name: "Bananas", price: 50, image: "https://via.placeholder.com/150?text=Bananas" }
  ];

  const container = document.getElementById("product-container");

  if (!container) {
    console.error("❌ No element with ID 'product-container' found in HTML.");
    return;
  }

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Search products...";
  searchInput.className = "form-control mb-4";
  container.parentElement.insertBefore(searchInput, container);

  function renderProducts(list) {
    container.innerHTML = "";

    if (list.length === 0) {
      container.innerHTML = `<p class="text-muted">No products found.</p>`;
      return;
    }

    list.forEach(product => {
      const col = document.createElement("div");
      col.className = "col-md-4 mb-4";

      col.innerHTML = `
        <div class="card h-100">
          <img src="${product.image}" class="card-img-top" alt="${product.name}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${product.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">₹${product.price}</h6>
            <button class="btn btn-success mt-auto" onclick="addToCart(${product.id})">Add to Cart</button>
          </div>
        </div>
      `;
      container.appendChild(col);
    });
  }

  // Initial render
  renderProducts(products);

  // Search filter
  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(value));
    renderProducts(filtered);
  });

  // Add to cart
  window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(p => p.id === productId);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Optional: show toast instead of alert
    alert(`${product.name} added to cart!`);
  };
});
