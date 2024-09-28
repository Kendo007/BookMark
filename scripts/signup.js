function addUser(event) {
    event.preventDefault();
    
    const username = event.target.username.value;
    const password = event.target.password.value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = users.some((u) => (u.username === username));

    if (userExists) {
        alert('Username is already taken!');
    } else {
        users.push({ username: username, password: password });
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('loggedInUser', username);

        alert('Sign-Up successful!');

        // Redirect to index.html or any other page
        window.location.href = '../index.html';
    }
}

// Add event listener for login form submission
document.querySelector('form').addEventListener('submit', addUser);
