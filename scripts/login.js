// Sample credentials stored in localStorage for testing purposes
if (!localStorage.getItem("users")) {
    localStorage.setItem(
        "users",
        JSON.stringify([{ username: "testuser", password: "testpassword" }])
    );
}

// Redirect user if they are already logged in
document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
        // If user is already logged in, redirect to the main page
        window.location.href = '../index.html';
    }
});

function loginUser(e) {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    const users = JSON.parse(localStorage.getItem("users"));
    const user = users.find(
        (u) => u.username === username && u.password === password
    );

    if (user) {
        // Store the logged-in user in localStorage
        localStorage.setItem("loggedInUser", username);

        // Redirect to the home page (or another page) after successful login
        alert("Login successful!");
        window.location.href = "../index.html";
    } else {
        alert("Invalid username or password");
    }
}

// Add event listener for login form submission
document.querySelector('form').addEventListener('submit', loginUser);
