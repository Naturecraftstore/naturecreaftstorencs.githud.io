document.addEventListener("DOMContentLoaded", () => {

  // Get order data from localStorage
  const orderData = JSON.parse(localStorage.getItem("orderData"));

  if (!orderData) {
    alert("No order found!");
    window.location.href = "home.html";
    return;
  }

  // Show data on page
  document.getElementById("orderId").innerText = orderData.orderId;
  document.getElementById("custName").innerText = orderData.name;
  document.getElementById("custMobile").innerText = orderData.mobile;

  document.getElementById("custAddress").innerText =
    `${orderData.address},
     ${orderData.city},
     ${orderData.district},
     ${orderData.state} - ${orderData.pincode}`;

  // Save order to order history
  saveOrderHistory(orderData);
});

/* ================= SAVE ORDER HISTORY ================= */
function saveOrderHistory(orderData) {

  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  orders.push({
    id: orderData.orderId,
    date: new Date().toLocaleString(),
    customer: {
      name: orderData.name,
      mobile: orderData.mobile,
      address: `${orderData.address}, ${orderData.city}, ${orderData.district}, ${orderData.state} - ${orderData.pincode}`
    },
    status: "Confirmed"
  });

  localStorage.setItem("orders", JSON.stringify(orders));
}
