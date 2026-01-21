/* ====== HERO SLIDER ====== */
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

function showSlides() {
    if (slides.length === 0) return;

    slides.forEach(slide => slide.style.display = "none");
    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;
    slides[slideIndex - 1].style.display = "block";
}

showSlides();
setInterval(showSlides, 3000);


/* ====== TOUCH & CLICK HIGHLIGHT ====== */
document.querySelectorAll("img").forEach(img => {
    img.addEventListener("touchstart", () => {
        img.classList.add("highlight");
        setTimeout(() => img.classList.remove("highlight"), 300);
    });

    img.addEventListener("click", () => {
        img.classList.add("highlight");
        setTimeout(() => img.classList.remove("highlight"), 300);
    });
});


/* ====== MOBILE MENU ====== */
function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}


/* ====== CART FUNCTIONS ====== */
function addToCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Example product (replace with dynamic values later)
    let product = {
        id: Date.now(),
        name: "Wooden Craft",
        price: 499
    };

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    alert("Product added to cart!");
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.innerText = cart.length;
    }
}


/* ====== LOAD CART COUNT ON PAGE LOAD ====== */
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
});
