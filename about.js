// Fade-in animation for feature boxes
const featureBoxes = document.querySelectorAll(".feature-box");

window.addEventListener("scroll", () => {
    featureBoxes.forEach(box => {
        const position = box.getBoundingClientRect().top;
        if (position < window.innerHeight - 50) {
            box.style.opacity = "1";
            box.style.transform = "translateY(0)";
        }
    });
});

// Initial hidden state for animation
featureBoxes.forEach(box => {
    box.style.opacity = "0";
    box.style.transform = "translateY(20px)";
    box.style.transition = "0.8s ease";
});

// Smooth popup animation for gallery images
const galleryImgs = document.querySelectorAll(".gallery-container img");

galleryImgs.forEach(img => {
    img.addEventListener("click", () => {
        alert("This product belongs to Nature Craft Store!");
    });
});

// Navbar shadow effect on scroll
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.style.boxShadow = "0 3px 15px rgba(0,0,0,0.2)";
    } else {
        navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    }
});
