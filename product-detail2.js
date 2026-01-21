// ================= MENU TOGGLE =================
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("show");
}

// ================= IMAGE CHANGE =================
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

// ================= CART LOGIC =================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, rating, image, sizeGroup) {
  const size = document.querySelector(`input[name="${sizeGroup}"]:checked`);

  if (!size) {
    alert("Please select a size before adding to cart!");
    return;
  }

  cart.push({
    name,
    price,
    rating,
    image,
    size: size.value,
    qty: 1
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  
}

function buyNow(name, price, rating, image, sizeGroup) {
  const size = document.querySelector(`input[name="${sizeGroup}"]:checked`);

  if (!size) {
    alert("Please select a size before buying!");
    return;
  }

  addToCart(name, price, rating, image, sizeGroup);
  window.location.href = "cart.html";
}

function updateCartCount() {
  document.getElementById("cart-count").innerText = cart.length;
}

updateCartCount();

