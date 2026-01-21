/* =============================
   LOAD ON PAGE OPEN
============================= */
document.addEventListener("DOMContentLoaded", () => {
  loadCart();
  updateCartCount();
});

/* =============================
   CART HELPERS
============================= */
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* =============================
   LOAD CART ITEMS
============================= */
function loadCart() {
  const cartContainer =
    document.getElementById("cart-items") ||
    document.getElementById("cartItems");

  const totalElement =
    document.getElementById("cart-total") ||
    document.getElementById("totalPrice");

  let cart = getCart();
  cartContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    if (totalElement) totalElement.innerText = "₹0";
    return;
  }

  cart.forEach((item, index) => {
    const qty = item.quantity || item.qty || 1;
    total += item.price * qty;

    cartContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        
        <div class="cart-details">
          <h4>${item.name}</h4>
          ${item.size ? `<p>Size: <strong>${item.size}</strong></p>` : ""}
          <p>Price: ₹${item.price}</p>
          ${item.rating ? `<p>Rating: ${item.rating}</p>` : ""}
        </div>

        <div class="cart-actions">
          <button onclick="changeQty(${index}, -1)">−</button>
          <span>${qty}</span>
          <button onclick="changeQty(${index}, 1)">+</button>
          <button class="remove-btn" onclick="removeItem(${index})">✖</button>
        </div>
      </div>
    `;
  });

  if (totalElement) {
    totalElement.innerText = `₹${total.toFixed(2)}`;
  }
}

/* =============================
   CHANGE QUANTITY
============================= */
function changeQty(index, change) {
  let cart = getCart();

  if (!cart[index].quantity && cart[index].qty) {
    cart[index].quantity = cart[index].qty;
  }

  cart[index].quantity += change;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  saveCart(cart);
  loadCart();
  updateCartCount();
}

/* =============================
   REMOVE ITEM
============================= */
function removeItem(index) {
  let cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  loadCart();
  updateCartCount();
}

/* =============================
   CART COUNT (BASED ON QTY)
============================= */
function updateCartCount() {
  const cart = getCart();
  const cartCount = document.getElementById("cart-count");

  if (!cartCount) return;

  const totalQty = cart.reduce(
    (sum, item) => sum + (item.quantity || item.qty || 1),
    0
  );

  cartCount.innerText = totalQty;
}

/* =============================
   PLACE ORDER
============================= */
function placeOrder() {
  let cart = getCart();

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  localStorage.setItem("order", JSON.stringify(cart));
  localStorage.removeItem("cart");
  window.location.href = "order.html";
}

/* =============================
   GO TO PAYMENT
============================= */
function goToPayment() {
  let cart = getCart();

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  localStorage.setItem("checkoutItems", JSON.stringify(cart));
  window.location.href = "payment.html";
}
