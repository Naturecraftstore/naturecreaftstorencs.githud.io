/* ====== MOBILE MENU ====== */
function toggleMenu() {
  document.getElementById("navLinks")?.classList.toggle("show");
}

/* ====== BUY NOW ====== */
function buyNow(name, price, rating, image) {

  const product = [{
    name: name,
    price: Number(price),
    rating: rating,
    image: image,
    qty: 1
  }];

  localStorage.setItem("buyNowItem", JSON.stringify(product));
  window.location.href = "payment.html";
}

/* ====== ADD TO CART ====== */
function addToCart(name, price, rating, image) {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  price = Number(price);

  let existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      rating: rating,
      image: image,
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();


}

/* ====== UPDATE CART COUNT ====== */
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = cart.reduce((sum, item) => sum + (item.qty || 0), 0);

  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.innerText = total;
  }
}

/* ====== PRODUCT SEARCH ====== */
document.getElementById("product-search")?.addEventListener("keyup", function () {
  const value = this.value.toLowerCase();
  const products = document.querySelectorAll(".product-card");

  products.forEach(card => {
    const title = card.querySelector(".product-title")?.innerText.toLowerCase();
    card.style.display = title && title.includes(value) ? "block" : "none";
  });
});

/* ====== LOAD CART COUNT ====== */
document.addEventListener("DOMContentLoaded", updateCartCount);
