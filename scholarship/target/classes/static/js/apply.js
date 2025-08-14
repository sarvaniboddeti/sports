// Apply JavaScript file for the Sports Scholarship Portal

// Global variables
let scholarships = [];
let selectedScholarship = null;

// DOM elements
const scholarshipList = document.getElementById('scholarshipList');
const applicationForm = document.getElementById('applicationForm');
const scholarshipApplicationForm = document.getElementById('scholarshipApplicationForm');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    checkAuthentication();
    loadScholarships();
    setupEventListeners();
});

// Check if user is authenticated
function checkAuthentication() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        // Redirect to login page
        window.location.href = 'login.html';
        return;
    }
}

// Load available scholarships
async function loadScholarships() {
    try {
        const response = await fetch('/api/scholarships/available');
        if (response.ok) {
            scholarships = await response.json();
            displayScholarshipSelection();
        } else {
            console.error('Failed to load scholarships');
            loadSampleScholarships();
        }
    } catch (error) {
        console.error('Error loading scholarships:', error);
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
            applicationDeadline: "2024-06-30"
        },
        {
            id: 2,
            title: "Basketball Performance Scholarship",
            description: "Awarded to basketball players who show exceptional athletic talent and potential for collegiate success.",
            sport: "Basketball",
            category: "Athletic",
            amount: 7500.00,
            applicationDeadline: "2024-07-15"
        },
        {
            id: 3,
            title: "Swimming Merit Scholarship",
            description: "For dedicated swimmers who excel both in the pool and in their academic pursuits.",
            sport: "Swimming",
            category: "Merit",
            amount: 6000.00,
            applicationDeadline: "2024-06-15"
        }
    ];
    displayScholarshipSelection();
}

// Display scholarship selection
function displayScholarshipSelection() {
    if (!scholarshipList) return;

    scholarshipList.innerHTML = scholarships.map(scholarship => `
        <div class="scholarship-card" onclick="selectScholarship(${scholarship.id})">
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
            </div>
            <button class="apply-btn" onclick="event.stopPropagation(); selectScholarship(${scholarship.id})">
                Select This Scholarship
            </button>
        </div>
    `).join('');
}

// Select a scholarship
function selectScholarship(scholarshipId) {
    selectedScholarship = scholarships.find(s => s.id === scholarshipId);
    if (selectedScholarship) {
        // Hide scholarship selection and show application form
        document.querySelector('.scholarship-selection').style.display = 'none';
        applicationForm.style.display = 'block';
        
        // Pre-fill form with user data
        prefillForm();
        
        // Update page title
        document.querySelector('.apply-header h1').textContent = `Apply for: ${selectedScholarship.title}`;
    }
}

// Pre-fill form with user data
function prefillForm() {
    const user = getCurrentUser();
    if (user) {
        const fullNameField = document.getElementById('fullName');
        const emailField = document.getElementById('email');
        const phoneField = document.getElementById('phone');
        
        if (fullNameField) fullNameField.value = user.fullName || '';
        if (emailField) emailField.value = localStorage.getItem('userEmail') || '';
        if (phoneField) phoneField.value = localStorage.getItem('userPhone') || '';
    }
}

// Setup event listeners
function setupEventListeners() {
    if (scholarshipApplicationForm) {
        scholarshipApplicationForm.addEventListener('submit', handleApplicationSubmission);
    }
}

// Handle application form submission
async function handleApplicationSubmission(e) {
    e.preventDefault();
    
    if (!selectedScholarship) {
        alert('Please select a scholarship first');
        return;
    }
    
    const formData = new FormData(scholarshipApplicationForm);
    
    // Validate required fields
    const requiredFields = [
        'fullName', 'email', 'phone', 'currentSchool', 'gpa', 'graduationYear',
        'academicPerformance', 'primarySport', 'sportsAchievements', 'financialNeed', 'personalStatement'
    ];
    
    for (const field of requiredFields) {
        if (!formData.get(field)) {
            alert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field`);
            return;
        }
    }
    
    // Prepare application data
    const applicationData = {
        scholarshipId: selectedScholarship.id,
        personalStatement: formData.get('personalStatement'),
        academicPerformance: formData.get('academicPerformance'),
        sportsAchievements: formData.get('sportsAchievements'),
        financialNeed: formData.get('financialNeed')
    };
    
    try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`/api/applications?userId=${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify(applicationData)
        });
        
        if (response.ok) {
            // Show success message
            showSuccessMessage('Application submitted successfully!');
            
            // Redirect to status page after a delay
            setTimeout(() => {
                window.location.href = 'status.html';
            }, 2000);
        } else {
            const errorData = await response.json();
            showErrorMessage(errorData.message || 'Failed to submit application. Please try again.');
        }
    } catch (error) {
        console.error('Application submission error:', error);
        showErrorMessage('Network error. Please check your connection and try again.');
    }
}

// Show success message
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <h3>Success!</h3>
        <p>${message}</p>
    `;
    
    // Insert at the top of the form
    applicationForm.insertBefore(successDiv, applicationForm.firstChild);
    
    // Remove after 5 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv);
        }
    }, 5000);
}

// Show error message
function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <h3>Error</h3>
        <p>${message}</p>
    `;
    
    // Insert at the top of the form
    applicationForm.insertBefore(errorDiv, applicationForm.firstChild);
    
    // Remove after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 5000);
}

// Go back to scholarship selection
function goBack() {
    document.querySelector('.scholarship-selection').style.display = 'block';
    applicationForm.style.display = 'none';
    document.querySelector('.apply-header h1').textContent = 'Apply for Scholarship';
    selectedScholarship = null;
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

// Get current user information
function getCurrentUser() {
    const token = localStorage.getItem('authToken');
    if (token) {
        return {
            id: localStorage.getItem('userId'),
            username: localStorage.getItem('username'),
            fullName: localStorage.getItem('fullName'),
            role: localStorage.getItem('userRole')
        };
    }
    return null;
}

// Check if user has already applied for this scholarship
async function checkExistingApplication(scholarshipId) {
    try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`/api/applications/user/${userId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        
        if (response.ok) {
            const applications = await response.json();
            return applications.some(app => app.scholarship.id === scholarshipId);
        }
    } catch (error) {
        console.error('Error checking existing application:', error);
    }
    return false;
}

// Add CSS for success and error messages
const style = document.createElement('style');
style.textContent = `
    .success-message {
        background-color: #d4edda;
        color: #155724;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        text-align: center;
        border: 1px solid #c3e6cb;
    }
    
    .success-message i {
        color: #28a745;
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
    }
    
    .error-message {
        background-color: #f8d7da;
        color: #721c24;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        text-align: center;
        border: 1px solid #f5c6cb;
    }
    
    .error-message i {
        color: #dc3545;
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
    }
`;
document.head.appendChild(style);
