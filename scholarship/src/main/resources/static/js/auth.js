// Authentication JavaScript file for the Sports Scholarship Portal

// DOM elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegisterLink = document.getElementById('showRegister');
const showLoginLink = document.getElementById('showLogin');
const loginCard = document.querySelector('.auth-card');
const registerCard = document.getElementById('registerCard');
const errorMessage = document.getElementById('errorMessage');
const registerErrorMessage = document.getElementById('registerErrorMessage');

// Initialize authentication
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    checkAuthStatus();
});

// Setup event listeners
function setupEventListeners() {
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', function(e) {
            e.preventDefault();
            showRegistrationForm();
        });
    }
    
    if (showLoginLink) {
        showLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            showLoginForm();
        });
    }
}

// Show registration form
function showRegistrationForm() {
    if (loginCard && registerCard) {
        loginCard.style.display = 'none';
        registerCard.style.display = 'block';
    }
}

// Show login form
function showLoginForm() {
    if (loginCard && registerCard) {
        loginCard.style.display = 'block';
        registerCard.style.display = 'none';
    }
}

// Handle login form submission
async function handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(loginForm);
    const username = formData.get('username');
    const password = formData.get('password');
    
    if (!username || !password) {
        showError('Please fill in all fields', errorMessage);
        return;
    }
    
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Store authentication data
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('username', data.username);
            localStorage.setItem('fullName', data.fullName);
            localStorage.setItem('userRole', data.role);
            
            // Show success message
            showSuccess('Login successful! Redirecting...', errorMessage);
            
            // Redirect to home page or dashboard
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            showError(data.error || 'Login failed. Please try again.', errorMessage);
        }
    } catch (error) {
        console.error('Login error:', error);
        showError('Network error. Please check your connection and try again.', errorMessage);
    }
}

// Handle registration form submission
async function handleRegister(e) {
    e.preventDefault();
    
    const formData = new FormData(registerForm);
    const username = formData.get('username');
    const email = formData.get('email');
    const fullName = formData.get('fullName');
    const phone = formData.get('phone');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    // Validation
    if (!username || !email || !fullName || !phone || !password || !confirmPassword) {
        showError('Please fill in all fields', registerErrorMessage);
        return;
    }
    
    if (password !== confirmPassword) {
        showError('Passwords do not match', registerErrorMessage);
        return;
    }
    
    if (password.length < 6) {
        showError('Password must be at least 6 characters long', registerErrorMessage);
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address', registerErrorMessage);
        return;
    }
    
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                fullName,
                phone,
                password
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showSuccess('Registration successful! You can now log in.', registerErrorMessage);
            
            // Clear form
            registerForm.reset();
            
            // Switch back to login form after a delay
            setTimeout(() => {
                showLoginForm();
            }, 2000);
        } else {
            showError(data.error || 'Registration failed. Please try again.', registerErrorMessage);
        }
    } catch (error) {
        console.error('Registration error:', error);
        showError('Network error. Please check your connection and try again.', registerErrorMessage);
    }
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show error message
function showError(message, element) {
    if (element) {
        element.textContent = message;
        element.style.display = 'block';
        element.style.backgroundColor = '#ffebee';
        element.style.color = '#c62828';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }
}

// Show success message
function showSuccess(message, element) {
    if (element) {
        element.textContent = message;
        element.style.display = 'block';
        element.style.backgroundColor = '#d4edda';
        element.style.color = '#155724';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }
}

// Check authentication status
function checkAuthStatus() {
    const token = localStorage.getItem('authToken');
    if (token) {
        // User is already logged in, redirect to home page
        window.location.href = 'index.html';
    }
}

// Logout function
function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('fullName');
    localStorage.removeItem('userRole');
    
    // Redirect to home page
    window.location.href = 'index.html';
}

// Check if user is authenticated
function isAuthenticated() {
    return localStorage.getItem('authToken') !== null;
}

// Get current user information
function getCurrentUser() {
    if (isAuthenticated()) {
        return {
            id: localStorage.getItem('userId'),
            username: localStorage.getItem('username'),
            fullName: localStorage.getItem('fullName'),
            role: localStorage.getItem('userRole')
        };
    }
    return null;
}

// Get authentication token
function getAuthToken() {
    return localStorage.getItem('authToken');
}

// Make authenticated API request
async function authenticatedRequest(url, options = {}) {
    const token = getAuthToken();
    if (!token) {
        throw new Error('No authentication token found');
    }
    
    const defaultOptions = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        ...options
    };
    
    const response = await fetch(url, defaultOptions);
    
    if (response.status === 401) {
        // Token expired or invalid, redirect to login
        logout();
        return;
    }
    
    return response;
}

// Export functions for use in other scripts
window.auth = {
    isAuthenticated,
    getCurrentUser,
    getAuthToken,
    authenticatedRequest,
    logout
};
