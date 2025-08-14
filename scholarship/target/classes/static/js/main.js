// Main JavaScript file for the Sports Scholarship Portal

// Global variables
let scholarships = [];
let filteredScholarships = [];

// DOM elements
const scholarshipsContainer = document.getElementById('scholarshipsContainer');
const sportFilter = document.getElementById('sportFilter');
const categoryFilter = document.getElementById('categoryFilter');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    loadScholarships();
    setupEventListeners();
});

// Navigation functionality
function initializeNavigation() {
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Load scholarships from the API
async function loadScholarships() {
    try {
        const response = await fetch('/api/scholarships/available');
        if (response.ok) {
            scholarships = await response.json();
            filteredScholarships = [...scholarships];
            displayScholarships();
        } else {
            console.error('Failed to load scholarships');
            displayError('Failed to load scholarships. Please try again later.');
        }
    } catch (error) {
        console.error('Error loading scholarships:', error);
        displayError('Network error. Please check your connection and try again.');
        // Load sample data for demonstration
        loadSampleScholarships();
    }
}

// Load sample scholarships for demonstration
function loadSampleScholarships() {
    scholarships = [
        {
            id: 1,
            title: "Academic Excellence in Football Scholarship",
            description: "This scholarship is awarded to outstanding football players who demonstrate exceptional academic performance and leadership qualities.",
            sport: "Football",
            category: "Academic",
            amount: 5000.00,
            applicationDeadline: "2024-06-30",
            startDate: "2024-09-01",
            endDate: "2025-05-31",
            eligibilityCriteria: "Minimum GPA 3.5, Varsity football player, Leadership experience",
            requiredDocuments: "Transcript, Coach recommendation, Personal statement"
        },
        {
            id: 2,
            title: "Basketball Performance Scholarship",
            description: "Awarded to basketball players who show exceptional athletic talent and potential for collegiate success.",
            sport: "Basketball",
            category: "Athletic",
            amount: 7500.00,
            applicationDeadline: "2024-07-15",
            startDate: "2024-09-01",
            endDate: "2025-05-31",
            eligibilityCriteria: "Varsity basketball experience, Athletic achievements, Team player",
            requiredDocuments: "Sports resume, Coach evaluation, Game statistics"
        },
        {
            id: 3,
            title: "Swimming Merit Scholarship",
            description: "For dedicated swimmers who excel both in the pool and in their academic pursuits.",
            sport: "Swimming",
            category: "Merit",
            amount: 6000.00,
            applicationDeadline: "2024-06-15",
            startDate: "2024-09-01",
            endDate: "2025-05-31",
            eligibilityCriteria: "Competitive swimming experience, Academic achievement, Community service",
            requiredDocuments: "Transcript, Swimming records, Community service log"
        },
        {
            id: 4,
            title: "Track & Field Need-Based Grant",
            description: "Financial assistance for talented track and field athletes with demonstrated financial need.",
            sport: "Track",
            category: "Need-based",
            amount: 4000.00,
            applicationDeadline: "2024-07-30",
            startDate: "2024-09-01",
            endDate: "2025-05-31",
            eligibilityCriteria: "Track & field participation, Financial need, Academic progress",
            requiredDocuments: "Financial aid forms, Transcript, Coach recommendation"
        },
        {
            id: 5,
            title: "Tennis Academic-Athletic Scholarship",
            description: "Combined scholarship recognizing both academic excellence and tennis achievement.",
            sport: "Tennis",
            category: "Academic",
            amount: 8000.00,
            applicationDeadline: "2024-06-20",
            startDate: "2024-09-01",
            endDate: "2025-05-31",
            eligibilityCriteria: "Minimum GPA 3.8, Competitive tennis experience, Leadership",
            requiredDocuments: "Transcript, Tennis ranking, Leadership portfolio"
        },
        {
            id: 6,
            title: "Soccer Community Impact Award",
            description: "For soccer players who make a positive impact in their community through sports and service.",
            sport: "Soccer",
            category: "Merit",
            amount: 3500.00,
            applicationDeadline: "2024-07-10",
            startDate: "2024-09-01",
            endDate: "2025-05-31",
            eligibilityCriteria: "Soccer participation, Community service, Academic standing",
            requiredDocuments: "Community service log, Coach reference, Academic record"
        }
    ];
    filteredScholarships = [...scholarships];
    displayScholarships();
}

// Display scholarships in the grid
function displayScholarships() {
    if (!scholarshipsContainer) return;

    if (filteredScholarships.length === 0) {
        scholarshipsContainer.innerHTML = `
            <div class="no-scholarships">
                <i class="fas fa-search"></i>
                <h3>No scholarships found</h3>
                <p>Try adjusting your filters or check back later for new opportunities.</p>
            </div>
        `;
        return;
    }

    scholarshipsContainer.innerHTML = filteredScholarships.map(scholarship => `
        <div class="scholarship-card">
            <div class="scholarship-header">
                <div>
                    <div class="scholarship-title">${scholarship.title}</div>
                    <div class="scholarship-sport">${scholarship.sport}</div>
                </div>
                <div class="scholarship-amount">$${scholarship.amount.toLocaleString()}</div>
            </div>
            <div class="scholarship-description">${scholarship.description}</div>
            <div class="scholarship-details">
                <div class="detail-item">
                    <i class="fas fa-calendar"></i>
                    <span>Deadline: ${formatDate(scholarship.applicationDeadline)}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-tag"></i>
                    <span>${scholarship.category}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-graduation-cap"></i>
                    <span>${scholarship.eligibilityCriteria.split(',')[0]}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-file-alt"></i>
                    <span>${scholarship.requiredDocuments.split(',')[0]}</span>
                </div>
            </div>
            <button class="apply-btn" onclick="applyForScholarship(${scholarship.id})">
                Apply Now
            </button>
        </div>
    `).join('');
}

// Setup event listeners
function setupEventListeners() {
    if (sportFilter) {
        sportFilter.addEventListener('change', filterScholarships);
    }
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterScholarships);
    }
}

// Filter scholarships based on selected criteria
function filterScholarships() {
    const selectedSport = sportFilter ? sportFilter.value : '';
    const selectedCategory = categoryFilter ? categoryFilter.value : '';

    filteredScholarships = scholarships.filter(scholarship => {
        const sportMatch = !selectedSport || scholarship.sport === selectedSport;
        const categoryMatch = !selectedCategory || scholarship.category === selectedCategory;
        return sportMatch && categoryMatch;
    });

    displayScholarships();
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Apply for scholarship function
function applyForScholarship(scholarshipId) {
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    if (!token) {
        // Redirect to login page
        window.location.href = 'login.html';
        return;
    }

    // Redirect to apply page with scholarship ID
    window.location.href = `apply.html?scholarship=${scholarshipId}`;
}

// Display error message
function displayError(message) {
    if (scholarshipsContainer) {
        scholarshipsContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Error</h3>
                <p>${message}</p>
            </div>
        `;
    }
}

// Utility function to check if user is logged in
function isUserLoggedIn() {
    return localStorage.getItem('authToken') !== null;
}

// Utility function to get user info
function getUserInfo() {
    const token = localStorage.getItem('authToken');
    if (token) {
        try {
            // In a real application, you would decode the JWT token
            // For now, we'll just check if it exists
            return { isLoggedIn: true };
        } catch (error) {
            return { isLoggedIn: false };
        }
    }
    return { isLoggedIn: false };
}

// Update navigation based on login status
function updateNavigation() {
    const userInfo = getUserInfo();
    const loginLink = document.querySelector('a[href="login.html"]');
    
    if (userInfo.isLoggedIn && loginLink) {
        loginLink.textContent = 'Dashboard';
        loginLink.href = 'status.html';
    }
}

// Call update navigation when page loads
document.addEventListener('DOMContentLoaded', updateNavigation);
