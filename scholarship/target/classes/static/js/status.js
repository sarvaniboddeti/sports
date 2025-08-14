// Status JavaScript file for the Sports Scholarship Portal

// Global variables
let applications = [];
let userInfo = null;

// DOM elements
const loginRequired = document.getElementById('loginRequired');
const applicationStatus = document.getElementById('applicationStatus');
const pendingCount = document.getElementById('pendingCount');
const underReviewCount = document.getElementById('underReviewCount');
const approvedCount = document.getElementById('approvedCount');
const rejectedCount = document.getElementById('rejectedCount');
const applicationsContainer = document.getElementById('applicationsContainer');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    checkAuthentication();
    if (isAuthenticated()) {
        loadApplicationStatus();
    }
});

// Check if user is authenticated
function checkAuthentication() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        // Show login required section
        if (loginRequired) loginRequired.style.display = 'flex';
        if (applicationStatus) applicationStatus.style.display = 'none';
        return;
    }
    
    // User is authenticated, show application status
    if (loginRequired) loginRequired.style.display = 'none';
    if (applicationStatus) applicationStatus.style.display = 'block';
    
    userInfo = getCurrentUser();
}

// Load application status
async function loadApplicationStatus() {
    try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`/api/applications/user/${userId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        
        if (response.ok) {
            applications = await response.json();
            updateStatusSummary();
            displayApplications();
        } else {
            console.error('Failed to load applications');
            loadSampleApplications();
        }
    } catch (error) {
        console.error('Error loading applications:', error);
        loadSampleApplications();
    }
}

// Load sample applications for demonstration
function loadSampleApplications() {
    applications = [
        {
            id: 1,
            scholarship: {
                title: "Academic Excellence in Football Scholarship",
                sport: "Football",
                amount: 5000.00
            },
            status: "PENDING",
            applicationDate: "2024-01-15T10:30:00",
            personalStatement: "I am a dedicated football player with a strong academic record...",
            academicPerformance: "GPA: 3.8, Honor Roll, Academic All-State",
            sportsAchievements: "Varsity Captain, All-District Team, State Championship Runner-up",
            financialNeed: "Family income below $50,000, seeking financial assistance for college"
        },
        {
            id: 2,
            scholarship: {
                title: "Basketball Performance Scholarship",
                sport: "Basketball",
                amount: 7500.00
            },
            status: "UNDER_REVIEW",
            applicationDate: "2024-01-10T14:20:00",
            personalStatement: "Basketball has been my passion since childhood...",
            academicPerformance: "GPA: 3.6, Math Club President, Science Fair Winner",
            sportsAchievements: "Point Guard, Team MVP, District Champions",
            financialNeed: "Single parent household, limited financial resources"
        },
        {
            id: 3,
            scholarship: {
                title: "Swimming Merit Scholarship",
                sport: "Swimming",
                amount: 6000.00
            },
            status: "APPROVED",
            applicationDate: "2024-01-05T09:15:00",
            personalStatement: "Swimming has taught me discipline and perseverance...",
            academicPerformance: "GPA: 3.9, National Honor Society, AP Scholar",
            sportsAchievements: "State Champion in 100m Freestyle, Team Captain",
            financialNeed: "Middle-income family, scholarship would significantly help with college costs"
        }
    ];
    updateStatusSummary();
    displayApplications();
}

// Update status summary counts
function updateStatusSummary() {
    const counts = {
        PENDING: 0,
        UNDER_REVIEW: 0,
        APPROVED: 0,
        REJECTED: 0
    };
    
    applications.forEach(app => {
        counts[app.status]++;
    });
    
    if (pendingCount) pendingCount.textContent = counts.PENDING;
    if (underReviewCount) underReviewCount.textContent = counts.UNDER_REVIEW;
    if (approvedCount) approvedCount.textContent = counts.APPROVED;
    if (rejectedCount) rejectedCount.textContent = counts.REJECTED;
}

// Display applications
function displayApplications() {
    if (!applicationsContainer) return;
    
    if (applications.length === 0) {
        applicationsContainer.innerHTML = `
            <div class="no-applications">
                <i class="fas fa-file-alt"></i>
                <h3>No Applications Yet</h3>
                <p>You haven't submitted any scholarship applications yet. <a href="apply.html">Apply now</a> to get started!</p>
            </div>
        `;
        return;
    }
    
    applicationsContainer.innerHTML = applications.map(application => `
        <div class="application-item">
            <div class="application-header">
                <div class="application-title">${application.scholarship.title}</div>
                <div class="application-status ${application.status.toLowerCase().replace('_', '-')}">
                    ${formatStatus(application.status)}
                </div>
            </div>
            <div class="application-details">
                <div>
                    <div class="detail-label">Sport:</div>
                    <div class="detail-value">${application.scholarship.sport}</div>
                </div>
                <div>
                    <div class="detail-label">Amount:</div>
                    <div class="detail-value">$${application.scholarship.amount.toLocaleString()}</div>
                </div>
                <div>
                    <div class="detail-label">Applied:</div>
                    <div class="detail-value">${formatDate(application.applicationDate)}</div>
                </div>
                <div>
                    <div class="detail-label">Status:</div>
                    <div class="detail-value">${formatStatus(application.status)}</div>
                </div>
            </div>
            <div class="application-content">
                <div class="content-section">
                    <h4>Personal Statement</h4>
                    <p>${application.personalStatement}</p>
                </div>
                <div class="content-section">
                    <h4>Academic Performance</h4>
                    <p>${application.academicPerformance}</p>
                </div>
                <div class="content-section">
                    <h4>Sports Achievements</h4>
                    <p>${application.sportsAchievements}</p>
                </div>
                <div class="content-section">
                    <h4>Financial Need</h4>
                    <p>${application.financialNeed}</p>
                </div>
            </div>
            <div class="application-actions">
                ${application.status === 'PENDING' ? `
                    <button class="btn-small btn-withdraw" onclick="withdrawApplication(${application.id})">
                        Withdraw Application
                    </button>
                ` : ''}
            </div>
        </div>
    `).join('');
}

// Format status for display
function formatStatus(status) {
    const statusMap = {
        'PENDING': 'Pending',
        'UNDER_REVIEW': 'Under Review',
        'APPROVED': 'Approved',
        'REJECTED': 'Rejected',
        'WITHDRAWN': 'Withdrawn'
    };
    return statusMap[status] || status;
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Withdraw application
async function withdrawApplication(applicationId) {
    if (!confirm('Are you sure you want to withdraw this application? This action cannot be undone.')) {
        return;
    }
    
    try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`/api/applications/${applicationId}/withdraw?userId=${userId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        
        if (response.ok) {
            // Update local data
            const app = applications.find(a => a.id === applicationId);
            if (app) {
                app.status = 'WITHDRAWN';
                updateStatusSummary();
                displayApplications();
            }
            
            showMessage('Application withdrawn successfully', 'success');
        } else {
            showMessage('Failed to withdraw application. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Error withdrawing application:', error);
        showMessage('Network error. Please check your connection and try again.', 'error');
    }
}

// Show message
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Insert at the top of the status content
    const statusContent = document.querySelector('.status-content');
    if (statusContent) {
        statusContent.insertBefore(messageDiv, statusContent.firstChild);
        
        // Remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 5000);
    }
}

// Check if user is authenticated
function isAuthenticated() {
    return localStorage.getItem('authToken') !== null;
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

// Add CSS for additional styling
const style = document.createElement('style');
style.textContent = `
    .no-applications {
        text-align: center;
        padding: 3rem;
        background: white;
        border-radius: 15px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    }
    
    .no-applications i {
        font-size: 4rem;
        color: #667eea;
        margin-bottom: 1rem;
    }
    
    .no-applications h3 {
        font-size: 1.8rem;
        color: #333;
        margin-bottom: 1rem;
    }
    
    .no-applications p {
        color: #666;
        margin-bottom: 1rem;
    }
    
    .no-applications a {
        color: #667eea;
        text-decoration: none;
        font-weight: 500;
    }
    
    .application-content {
        margin: 1.5rem 0;
    }
    
    .content-section {
        margin-bottom: 1.5rem;
    }
    
    .content-section h4 {
        font-size: 1.1rem;
        color: #333;
        margin-bottom: 0.5rem;
        font-weight: 600;
    }
    
    .content-section p {
        color: #666;
        line-height: 1.6;
        background-color: #f8f9fa;
        padding: 1rem;
        border-radius: 8px;
        border-left: 3px solid #667eea;
    }
    
    .message {
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        text-align: center;
    }
    
    .message.success {
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }
    
    .message.error {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }
`;
document.head.appendChild(style);
