/* ================= DOM READY ================= */
document.addEventListener("DOMContentLoaded", loadOrders);

/* ================= AUTO STATUS UPDATE ================= */
function autoUpdateStatus(order) {
  if (order.status === "Cancelled") return "Cancelled";

  const createdAt = order.createdAt || Date.now();
  const minutes = (Date.now() - createdAt) / 60000;

  if (minutes < 1) return "Confirmed";
  if (minutes < 3) return "Shipped";
  if (minutes < 5) return "Out for Delivery";
  return "Delivered";
}

/* ================= LOAD ORDERS ================= */
function loadOrders() {
  const container = document.getElementById("ordersContainer");
  if (!container) return;

  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    container.innerHTML = "<p>Please login to view your orders.</p>";
    return;
  }

  const ordersKey = `orders_${currentUser}`;
  let orders = JSON.parse(localStorage.getItem(ordersKey)) || [];

  container.innerHTML = "";

  if (orders.length === 0) {
    container.innerHTML = "<p>No orders found.</p>";
    return;
  }

  // Newest order first
  orders.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

  orders.forEach(order => {
    // Auto status update
    order.status = autoUpdateStatus(order);

    const items = Array.isArray(order.items) ? order.items : [];
    let itemsHTML = "";
    let total = 0;

    items.forEach(item => {
      const qty = Number(item.quantity || item.qty || 1);
      const price = Number(item.price) || 0;
      total += price * qty;

      itemsHTML += `
        <div class="order-item">
          <img src="${item.image || ''}" alt="${item.name || 'Product'}">
          <div>
            <p><strong>${item.name || 'Product'}</strong></p>
            <p>₹${price} × ${qty}</p>
          </div>
        </div>
      `;
    });

    container.innerHTML += `
      <div class="order-card">
        <h3>Order ID: ${order.orderId}</h3>
        <p><strong>Date:</strong> ${order.date}</p>

        <p>
          <strong>Status:</strong>
          <span class="status ${order.status === 'Cancelled' ? 'cancelled' : ''}">
            ${order.status}
          </span>
        </p>

        <h4>Delivery Address</h4>
        <p>${order.name}</p>
        <p>${order.mobile}</p>
        <p>${order.address}, ${order.city}, ${order.state} - ${order.pincode}</p>

        <h4>Products</h4>
        ${itemsHTML}

        <p class="total">Total: ₹${total.toFixed(2)}</p>

        <div class="order-actions">
          ${
            order.status === "Cancelled"
              ? "<p class='status cancelled'>Order Cancelled</p>"
              : `
                <button onclick="cancelOrder('${order.orderId}')">❌ Cancel Order</button>
                <button onclick="trackOrder('${order.orderId}')">📍 Track Order</button>
              `
          }
        </div>
      </div>
    `;
  });

  // Save updated status back
  localStorage.setItem(ordersKey, JSON.stringify(orders));
}

/* ================= CANCEL ORDER ================= */
function cancelOrder(orderId) {
  const currentUser = localStorage.getItem("currentUser");
  const ordersKey = `orders_${currentUser}`;

  const orders = JSON.parse(localStorage.getItem(ordersKey)) || [];
  const index = orders.findIndex(o => o.orderId === orderId);

  if (index === -1) {
    alert("Order not found");
    return;
  }

  if (!confirm("Are you sure you want to cancel this order?")) return;

  orders[index].status = "Cancelled";
  localStorage.setItem(ordersKey, JSON.stringify(orders));

  alert("Order cancelled ❌");
  loadOrders();
}

/* ================= TRACK ORDER ================= */
function trackOrder(orderId) {
  window.location.href = `track-order.html?id=${orderId}`;
}
