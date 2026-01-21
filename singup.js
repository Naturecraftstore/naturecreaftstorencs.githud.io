// Example registration
document.getElementById("registerForm")?.addEventListener("submit", function(e){
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if(!username || !email || !password){
        alert("Please fill all fields");
        return;
    }

    // Get existing users
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check duplicate
    if(users.some(u => u.email === email)){
        alert("Email already registered!");
        return;
    }

    // Add new user
    users.push({username, email, password});
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful 🎉");
    window.location.href = "login.html";
});
