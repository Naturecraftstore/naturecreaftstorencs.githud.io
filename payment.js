/* ================= DOM READY ================= */
document.addEventListener("DOMContentLoaded", () => {
  loadSummary();
});

/* ================= LOAD ORDER SUMMARY ================= */
function loadSummary() {
  let items =
    JSON.parse(localStorage.getItem("buyNowItem")) ||
    (localStorage.getItem("buyNowProduct")
      ? [JSON.parse(localStorage.getItem("buyNowProduct"))]
      : []);

  if (!items || items.length === 0) {
    items = JSON.parse(localStorage.getItem("checkoutItems")) || [];
  }

  if (!items || items.length === 0) {
    items = JSON.parse(localStorage.getItem("cart")) || [];
  }

  const container = document.getElementById("summaryItems");
  const totalEl = document.getElementById("totalAmount");

  if (!container || !totalEl) return;

  container.innerHTML = "";
  let total = 0;

  if (items.length === 0) {
    container.innerHTML = "<p>No products found.</p>";
    totalEl.innerText = "₹0";
    return;
  }

  items.forEach(item => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity || item.qty || 1);
    total += price * qty;

    container.innerHTML += `
      <div class="summary-item">
        <img src="${item.image || ''}" alt="${item.name || 'Product'}">
        <div>
          <p><strong>${item.name || 'Product'}</strong></p>
          <p>Qty: ${qty}</p>
          <p>₹${price}</p>
        </div>
      </div>
    `;
  });

  totalEl.innerText = "" + total.toFixed(2);

  localStorage.setItem("checkoutItems", JSON.stringify(items));
}

/* ================= PINCODE AUTO FILL ================= */
function getAddress() {
  const pin = document.getElementById("pincode").value;
  if (pin.length !== 6) return;

  fetch(`https://api.postalpincode.in/pincode/${pin}`)
    .then(res => res.json())
    .then(data => {
      if (data[0].Status === "Success") {
        const post = data[0].PostOffice[0];
        document.getElementById("city").value = post.Block;
        document.getElementById("district").value = post.District;
        document.getElementById("state").value = post.State;
      }
    });
}

/* ================= PAYMENT UI ================= */
function showCard() {
  document.getElementById("cardBox").style.display = "flex";
  document.getElementById("upiBox").style.display = "none";
}

function showUPI() {
  document.getElementById("cardBox").style.display = "none";
  document.getElementById("upiBox").style.display = "flex";
}

function hideAll() {
  document.getElementById("cardBox").style.display = "none";
  document.getElementById("upiBox").style.display = "none";
}

/* ================= PAY & PLACE ORDER ================= */
function payNow() {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    alert("Please login first");
    return;
  }

  const name = document.getElementById("name").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const address = document.getElementById("address").value.trim();
  const city = document.getElementById("city").value.trim();
  const state = document.getElementById("state").value.trim();
  const pincode = document.getElementById("pincode").value.trim();

  if (!name || !mobile || !address || !city || !state || !pincode) {
    alert("Please fill all address details");
    return;
  }

  let items =
    JSON.parse(localStorage.getItem("buyNowItem")) ||
    (localStorage.getItem("buyNowProduct")
      ? [JSON.parse(localStorage.getItem("buyNowProduct"))]
      : []);

  if (!items || items.length === 0) {
    items = JSON.parse(localStorage.getItem("checkoutItems")) || [];
  }

  if (!items || items.length === 0) {
    items = JSON.parse(localStorage.getItem("cart")) || [];
  }

  if (!items || items.length === 0) {
    alert("No products to checkout!");
    return;
  }

  const cleanItems = items.map(item => ({
    name: item.name,
    price: Number(item.price) || 0,
    quantity: Number(item.quantity || item.qty || 1),
    image: item.image || ""
  }));

  const newOrder = {
    orderId: "NC" + Date.now(),
    date: new Date().toLocaleString(),
    createdAt: Date.now(),
    status: "Confirmed",

    name,
    mobile,
    address,
    city,
    state,
    pincode,

    items: cleanItems
  };

  const ordersKey = `orders_${currentUser}`;
  const orders = JSON.parse(localStorage.getItem(ordersKey)) || [];
  orders.unshift(newOrder); // NEW ORDER FIRST
  localStorage.setItem(ordersKey, JSON.stringify(orders));

  /* ===== CLEANUP ===== */
  localStorage.removeItem("cart");
  localStorage.removeItem("buyNowItem");
  localStorage.removeItem("buyNowProduct");
  localStorage.removeItem("checkoutItems");

  alert("Payment Successful 🎉");
  window.location.href = "confirmation.html";
}
