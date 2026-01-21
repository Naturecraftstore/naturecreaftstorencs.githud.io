document.addEventListener("DOMContentLoaded", loadTrackOrder);

function loadTrackOrder() {
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get("id");

  const orderIdEl = document.getElementById("orderId");
  const productBox = document.getElementById("productBox");
  const statusBox = document.getElementById("statusBox");

  if (!orderId) {
    productBox.innerHTML = "<p>Invalid Order ID</p>";
    return;
  }

  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    productBox.innerHTML = "<p>Please login to track your order</p>";
    return;
  }

  const ordersKey = `orders_${currentUser}`;
  const orders = JSON.parse(localStorage.getItem(ordersKey)) || [];

  const order = orders.find(o => o.orderId === orderId);
  if (!order) {
    productBox.innerHTML = "<p>Order not found</p>";
    return;
  }

  orderIdEl.innerText = order.orderId;

  /* ================= PRODUCTS ================= */
  let total = 0;
  productBox.innerHTML = "";

  if (!Array.isArray(order.items) || order.items.length === 0) {
    productBox.innerHTML = "<p>No product details available</p>";
  } else {
    order.items.forEach(item => {
      const qty = Number(item.quantity || item.qty || 1);
      const price = Number(item.price) || 0;
      total += price * qty;

      productBox.innerHTML += `
        <div class="product">
          <img src="${item.image || ''}">
          <div>
            <p><strong>${item.name}</strong></p>
            <p>Qty: ${qty}</p>
            <p>₹${price}</p>
          </div>
        </div>
      `;
    });

    productBox.innerHTML += `<p class="total">Total: ₹${total.toFixed(2)}</p>`;
  }

  /* ================= AUTO STATUS ================= */
  const status = autoUpdateStatus(order);

  statusBox.innerHTML = `
    <div class="status ${status === "Confirmed" ? "active" : ""}">📦 Confirmed</div>
    <div class="status ${status === "Shipped" ? "active" : ""}">🚚 Shipped</div>
    <div class="status ${status === "Out for Delivery" ? "active" : ""}">📍 Out for Delivery</div>
    <div class="status ${status === "Delivered" ? "active" : ""}">✅ Delivered</div>
    ${status === "Cancelled" ? `<div class="status cancelled">❌ Cancelled</div>` : ""}
  `;
}

/* ================= AUTO STATUS LOGIC ================= */
function autoUpdateStatus(order) {
  if (order.status === "Cancelled") return "Cancelled";

  const minutes = (Date.now() - (order.createdAt || Date.now())) / 60000;

  if (minutes < 1) return "Confirmed";
  if (minutes < 3) return "Shipped";
  if (minutes < 5) return "Out for Delivery";
  return "Delivered";
}

/* ================= BACK ================= */
function goBack() {
  window.location.href = "home.html";
}
