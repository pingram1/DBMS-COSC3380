# TEAM 7 Ice Cream Shop Management System

A web-based management system for ice cream shops with separate interfaces for administrators (employees) and customers.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14.0.0 or higher)
- [MySQL](https://www.mysql.com/) (v8.0 or higher)
- [Git](https://git-scm.com/) (for cloning the repository)

## Project Structure
```
ice-cream-shop/
├── client/             # React frontend
│   ├── src/
│   ├── package.json
│   └── ...
└── server/            # Node.js backend
    ├── config/
    ├── routes/
    ├── middleware/
    ├── package.json
    └── ...
```

## Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ice-cream-shop
```

### 2. Backend Setup

Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Required backend dependencies:
```bash
npm install express cors mysql2 dotenv jsonwebtoken nodemon
```

Create a `.env` file in the server directory:
```env
MYSQL_HOST=your_host
MYSQL_USER=your_user
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=your_database
MYSQL_PORT=your_port
JWT_SECRET=your_jwt_secret
```

### 3. Frontend Setup

Navigate to the client directory and install dependencies:
```bash
cd ../client
npm install
```

Required frontend dependencies:
```bash
npm install react-router-dom axios tailwindcss @headlessui/react
```

## Database Setup

Ensure your MySQL database is running and accessible. The application uses the following tables:
- employee
- customer
- transaction
- item
- food_item

(Database schema is provided in separate SQL files)

## Running the Application

1. Start the backend server:
```bash
cd server
npm start
# Server will run on http://localhost:5000
```

2. In a new terminal, start the frontend application:
```bash
cd client
npm start
# Client will run on http://localhost:3000
```

## Login Information

### Admin Login
- Use employee credentials:
  - First Name
  - Last Name
  - Employee ID

### Customer Login
- Use phone number registered in the customer database

## Available Scripts

In the server directory:
```bash
npm start           # Start the server with nodemon
npm run start:prod  # Start the server in production mode
```

In the client directory:
```bash
npm start   # Start the React development server
npm build   # Create a production build
npm test    # Run tests
```

## Environment Variables

### Backend (.env)
```env
MYSQL_HOST - MySQL database host
MYSQL_USER - MySQL database user
MYSQL_PASSWORD - MySQL database password
MYSQL_DATABASE - MySQL database name
MYSQL_PORT - MySQL database port
JWT_SECRET - Secret key for JWT tokens
```

## API Endpoints

### Authentication
- POST `/auth/admin/login` - Admin login
- POST `/auth/customer/login` - Customer login

### Employees
- GET `/employee` - Get all employees
- GET `/employee/:id` - Get employee by ID

### Customers
- GET `/customer` - Get all customers
- GET `/customer/:id` - Get customer by ID

## Common Issues & Troubleshooting

1. Database Connection Issues
   - Verify database credentials in .env file
   - Ensure MySQL server is running
   - Check if port is accessible

2. Frontend Connection Issues
   - Verify backend URL in frontend configuration
   - Check if CORS is properly configured

3. Login Issues
   - Verify employee/customer data exists in database
   - Check console for detailed error messages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
