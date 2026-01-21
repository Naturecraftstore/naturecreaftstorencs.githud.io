/* ================= MENU TOGGLE ================= */
function toggleMenu() {
  document.getElementById("navLinks")?.classList.toggle("show");
}

/* ================= IMAGE CHANGE ================= */
function changeImage(productId, element) {
  const mainImg = document.getElementById("main-" + productId);
  if (mainImg && element?.src) {
    mainImg.src = element.src;
  }

  element.parentElement.querySelectorAll(".thumb").forEach(t =>
    t.classList.remove("active")
  );
  element.classList.add("active");
}

/* ================= CART STORAGE ================= */
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* ================= UPDATE CART COUNT ================= */
function updateCartCount() {
  const cart = getCart();
  const totalQty = cart.reduce((sum, item) => sum + Number(item.qty || 0), 0);

  const cartCount = document.getElementById("cart-count");
  if (cartCount) cartCount.innerText = totalQty;
}

/* ================= ADD TO CART (FIXED) ================= */
function addToCart(name, price, rating, image) {

  // 🔒 SAFETY FIXES
  if (!name || price === undefined || !image) {
    alert("Product data missing!");
    return;
  }

  price = Number(price); // ✅ FIX NaN issue

  if (isNaN(price)) {
    alert("Invalid product price");
    return;
  }

  let cart = getCart();
  let existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      rating: rating || "",
      image: image,
      qty: 1
    });
  }

  saveCart(cart);
  updateCartCount();
 
}

/* ================= BUY NOW (FIXED) ================= */
function buyNow(name, price, rating, image) {

  if (!name || price === undefined || !image) {
    alert("Product data missing!");
    return;
  }

  price = Number(price);

  if (isNaN(price)) {
    alert("Invalid product price");
    return;
  }

  const buyNowItem = [{
    name: name,
    price: price,
    rating: rating || "",
    image: image,
    qty: 1
  }];

  localStorage.setItem("buyNowItem", JSON.stringify(buyNowItem));
  window.location.href = "payment.html";
}

/* ================= LOAD CART COUNT ================= */
document.addEventListener("DOMContentLoaded", updateCartCount);
