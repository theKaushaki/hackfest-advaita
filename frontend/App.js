document.addEventListener("DOMContentLoaded", function () {
    // Show Login Form
    function showLoginForm() {
        document.getElementById("overlay").style.display = "block";
        document.getElementById("loginForm").style.display = "block";
        document.getElementById("registerForm").style.display = "none";
    }

    // Show Register Form
    function showRegisterForm() {
        document.getElementById("overlay").style.display = "block";
        document.getElementById("registerForm").style.display = "block";
        document.getElementById("loginForm").style.display = "none";
    }

    // Hide All Forms
    function hideAllForms() {
        document.getElementById("overlay").style.display = "none";
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("registerForm").style.display = "none";
    }

    function authenticateUser() {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
    
        if (username && password) {
            alert("Login successful! You now have 1000 Galleons!");
            hideAllForms();
        } else {
            alert("Please enter valid credentials.");
        }
    }
    
    // Fix button click animation for all auth buttons
    document.querySelectorAll(".auth button").forEach(button => {
        button.addEventListener("click", function() {
            this.classList.add("clicked");
            setTimeout(() => {
                this.classList.remove("clicked");
            }, 200);
        });
    });
    

    // Handle User Registration
    function registerUser() {
        let username = document.getElementById("regUsername").value;
        let email = document.getElementById("regEmail").value;
        let password = document.getElementById("regPassword").value;
        let confirmPassword = document.getElementById("regConfirmPassword").value;
        if (!username || !email || !password || !confirmPassword) {
            alert("Please fill in all fields.");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        alert("Registration successful! You can now login.");
        showLoginForm();
    }

    // Open Stock Page (Redirect)
    function openStockPage(companyName) {
        alert(`Redirecting to ${companyName} stock page...`);
    }

    // Attach event listeners
    document.querySelector(".auth button").addEventListener("click", function () {
        this.classList.add("clicked");
        setTimeout(() => {
            this.classList.remove("clicked");
        }, 200);
    });

    // Expose functions globally
    window.showLoginForm = showLoginForm;
    window.showRegisterForm = showRegisterForm;
    window.hideAllForms = hideAllForms;
    window.authenticateUser = authenticateUser;
    window.registerUser = registerUser;
    window.openStockPage = openStockPage;
});