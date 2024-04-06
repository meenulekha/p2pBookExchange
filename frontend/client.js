
const socket = io();
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.getElementById('chat-messages');

sendButton.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
//for login
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    login(username, password);
});

function login(username, password) {
    // Replace 'your-backend-url/login' with the actual URL of your login endpoint
    fetch('placeholderbackendurl/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => {
        if (response.ok) {
            console.log('Login successful');
        } else {
            console.error('Login failed');
        }
    })
    .catch(error => {
        console.error('Error during login:', error);
        // Handle error (e.g., display error message to the user)
    });
}

// Event listener for registration form submission
document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the registration data from the input fields
    const regUsername = document.getElementById('reg-username').value;
    const email = document.getElementById('email').value;
    const regPassword = document.getElementById('reg-password').value;

    // Perform validation if needed

    // Send the registration data to the backend for user registration
    register(regUsername, email, regPassword);
});

// Function to send registration data to the backend for user registration
function register(username, email, password) {
    // Make an API request to your backend for user registration
    // Replace 'your-backend-url/register' with the actual URL of your registration endpoint
    fetch('your-backend-url/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        })
    })
    .then(response => {
        if (response.ok) {
            // Registration successful, perform actions (e.g., display success message)
            console.log('Registration successful');
            // Display success message to the user
        } else {
            // Registration failed, display error message
            console.error('Registration failed');
            // Display error message to the user
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        // Handle error (e.g., display error message to the user)
    });
}

//chat function
function sendMessage() {
    const message = messageInput.value.trim();
    if (message !== '') {
        socket.emit('chat message', message);
        messageInput.value = ''; // Clear the input field
    }
}

socket.on('chat message', function(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
});
//for displaying books
fetchBooks().then(books => {
    const bookListContainer = document.getElementById('book-list');

    bookListContainer.innerHTML = '';

    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');

        bookElement.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Genre: ${book.genre}</p>
            <!-- Add more book details as needed -->

            <button onclick="addToCart(${book.id})">Add to Cart</button>
        `;

        bookListContainer.appendChild(bookElement);
    });
}).catch(error => {
    console.error('Error fetching books:', error);
});
//for user profiles
fetchUserProfile().then(profile => {
    document.getElementById('username').textContent = profile.username;
    document.getElementById('email').textContent = profile.email;
}).catch(error => {
    console.error('Error fetching user profile:', error);
});

