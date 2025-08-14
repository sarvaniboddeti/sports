# Sports Scholarship Application Portal

A comprehensive web application for managing sports scholarship applications, built with Java Spring Boot backend and modern HTML/CSS/JavaScript frontend.

## Features

### 🏠 Home Page
- Display available scholarships with filtering by sport and category
- Responsive design with modern UI
- Scholarship cards with detailed information
- Call-to-action buttons for application

### 🔐 User Authentication
- User registration and login system
- JWT-based authentication
- Secure password handling with BCrypt
- Role-based access control (Student, Admin, Reviewer)

### 📝 Scholarship Application
- Comprehensive application form
- Document upload support
- Real-time validation
- Application tracking

### 📊 Application Status
- Real-time status tracking
- Status summary dashboard
- Application history
- Withdrawal functionality

## Technology Stack

### Backend
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Security** with JWT
- **Spring Data JPA**
- **MySQL 8.0**
- **Maven**

### Frontend
- **HTML5**
- **CSS3** with modern design
- **JavaScript (ES6+)**
- **Font Awesome** icons
- **Responsive design**

## Prerequisites

- Java 17 or higher
- MySQL 8.0 or higher
- Maven 3.6 or higher
- Modern web browser

## Installation & Setup

### 1. Database Setup

1. Install MySQL 8.0+
2. Create a new database:
```sql
CREATE DATABASE sports_scholarship;
```

3. Update database credentials in `src/main/resources/application.properties`:
```properties
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 2. Backend Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd scholarship-portal
```

2. Build the project:
```bash
mvn clean install
```

3. Run the application:
```bash
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 3. Frontend Setup

The frontend is served directly by Spring Boot from `src/main/resources/static/`

1. Open your web browser
2. Navigate to `http://localhost:8080`
3. The application will load automatically

## Project Structure

```
scholarship-portal/
├── src/
│   ├── main/
│   │   ├── java/com/sports/scholarship/
│   │   │   ├── config/          # Security configuration
│   │   │   ├── controller/      # REST API controllers
│   │   │   ├── dto/            # Data Transfer Objects
│   │   │   ├── entity/         # JPA entities
│   │   │   ├── repository/     # Data access layer
│   │   │   ├── security/       # JWT utilities
│   │   │   ├── service/        # Business logic
│   │   │   └── ScholarshipPortalApplication.java
│   │   └── resources/
│   │       ├── static/         # Frontend files
│   │       │   ├── css/        # Stylesheets
│   │       │   ├── js/         # JavaScript files
│   │       │   ├── index.html  # Home page
│   │       │   ├── login.html  # Login page
│   │       │   ├── apply.html  # Application page
│   │       │   └── status.html # Status page
│   │       └── application.properties
│   └── test/                   # Test files
├── pom.xml                     # Maven configuration
└── README.md                   # This file
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Scholarships
- `GET /api/scholarships` - Get all scholarships
- `GET /api/scholarships/available` - Get available scholarships
- `GET /api/scholarships/{id}` - Get scholarship by ID
- `POST /api/scholarships` - Create scholarship (Admin)
- `PUT /api/scholarships/{id}` - Update scholarship (Admin)
- `DELETE /api/scholarships/{id}` - Delete scholarship (Admin)

### Applications
- `POST /api/applications` - Submit application
- `GET /api/applications/user/{userId}` - Get user applications
- `GET /api/applications/{id}` - Get application by ID
- `PUT /api/applications/{id}/status` - Update application status
- `PUT /api/applications/{id}/withdraw` - Withdraw application

## Usage

### For Students

1. **Register/Login**: Create an account or sign in
2. **Browse Scholarships**: View available scholarships on the home page
3. **Apply**: Select a scholarship and complete the application form
4. **Track Status**: Monitor application progress on the status page

### For Administrators

1. **Manage Scholarships**: Create, update, and deactivate scholarships
2. **Review Applications**: Process and approve/reject applications
3. **User Management**: Manage user accounts and roles

## Security Features

- JWT-based authentication
- Password encryption with BCrypt
- Role-based access control
- CORS configuration
- Input validation and sanitization

## Database Schema

### Users Table
- User authentication and profile information
- Role-based permissions

### Scholarships Table
- Scholarship details and requirements
- Application deadlines and amounts

### Applications Table
- Application submissions and status
- Document references and review comments

## Customization

### Adding New Sports
1. Update the sport filter options in `index.html`
2. Add sport-specific validation if needed
3. Update CSS for new sport categories

### Modifying Application Fields
1. Update the form in `apply.html`
2. Modify the corresponding JavaScript validation
3. Update backend DTOs and entities

### Styling Changes
1. Modify `src/main/resources/static/css/style.css`
2. Add custom CSS classes as needed
3. Ensure responsive design compatibility

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify MySQL is running
   - Check database credentials in `application.properties`
   - Ensure database exists

2. **Port Already in Use**
   - Change port in `application.properties`
   - Kill existing process on port 8080

3. **Frontend Not Loading**
   - Check browser console for errors
   - Verify static files are in correct location
   - Clear browser cache

### Logs

Check application logs for detailed error information:
```bash
tail -f logs/application.log
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Email: info@sportsscholarship.com
- Phone: +1 (555) 123-4567

## Future Enhancements

- Email notifications
- Document management system
- Advanced reporting and analytics
- Mobile application
- Integration with external scholarship databases
- Multi-language support
- Advanced search and filtering
- Bulk application processing
- Payment integration for application fees

---

**Note**: This is a demonstration application. For production use, ensure proper security measures, data validation, and error handling are implemented.
