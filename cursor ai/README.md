# Patient Appointment and Registration Management System

A complete full-stack web application for managing patient appointments and registrations in a healthcare setting. Built with Node.js, Express.js, MongoDB, and vanilla JavaScript.

## 🎯 Project Overview

This system provides a comprehensive solution for healthcare facilities to manage patient appointments, registrations, and consultations. It supports three user roles: **Patient**, **Doctor**, and **Staff**.

## 🏗️ Architecture

- **Frontend**: HTML, CSS, JavaScript (Vanilla - No frameworks)
- **Backend**: Node.js + Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Pattern**: MVC (Model-View-Controller)

## 📁 Project Structure

```
patient_management/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── appointmentController.js
│   │   ├── patientController.js
│   │   └── doctorController.js
│   ├── middlewares/
│   │   └── auth.js              # JWT authentication & authorization
│   ├── models/
│   │   ├── User.js              # User model (authentication)
│   │   ├── Patient.js           # Patient profile model
│   │   ├── Doctor.js            # Doctor profile model
│   │   └── Appointment.js       # Appointment model
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── appointmentRoutes.js
│   │   ├── patientRoutes.js
│   │   └── doctorRoutes.js
│   ├── server.js                # Express server entry point
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── css/
│   │   └── styles.css           # Main stylesheet
│   ├── js/
│   │   └── api.js               # API communication module
│   └── pages/
│       ├── index.html           # Landing page
│       ├── login.html           # Login page
│       ├── register.html        # Patient registration
│       ├── patient/
│       │   ├── dashboard.html
│       │   └── book-appointment.html
│       ├── doctor/
│       │   └── dashboard.html
│       └── staff/
│           ├── dashboard.html
│           ├── register-patient.html
│           └── schedule-appointment.html
│
└── README.md
```

## ⚡ Quick Start

```bash
# 1. Install backend dependencies
cd backend
npm install

# 2. Create .env file (copy from .env.example and update values)
# 3. Start MongoDB (local or use Atlas)

# 4. Start backend server
npm start

# 5. Seed test data (optional but recommended)
node scripts/seed.js

# 6. Open frontend in browser or use a local server
# Navigate to frontend/pages/index.html
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 2: Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Edit `.env` and set your values:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/patient_management
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

**Important**: Change `JWT_SECRET` to a strong, random string in production.

### Step 3: Start MongoDB

If using local MongoDB:

```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
# or
mongod
```

Or use MongoDB Atlas (cloud) and update `MONGODB_URI` in `.env`.

### Step 4: Start the Backend Server

```bash
cd backend
npm start
# or for development with auto-reload:
npm run dev
```

The server will run on `http://localhost:3000`

### Step 5: Open Frontend

Open the frontend HTML files in a web browser. You can:

1. Use a local web server (recommended):
   ```bash
   # Using Python
   cd frontend
   python -m http.server 8000
   
   # Using Node.js http-server
   npx http-server frontend -p 8000
   ```

2. Or open files directly in the browser (some features may not work due to CORS)

**Note**: Update `API_BASE_URL` in `frontend/js/api.js` if your backend runs on a different port.

## 👥 User Roles & Features

### 1. Patient
- Register account
- Book appointments
- View upcoming appointments
- View appointment history
- Cancel appointments

### 2. Doctor
- View today's appointments
- View all appointments
- Update appointment status (mark as completed)
- Add consultation notes
- View patient details

### 3. Staff
- Register walk-in patients
- Schedule appointments for patients
- View today's appointment queue
- View all patients
- Modify appointments

## 🔐 Authentication

- JWT-based authentication
- Password hashing using bcryptjs
- Role-based access control
- Protected API routes

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new patient
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Appointments
- `POST /api/appointments` - Book appointment (patient/staff)
- `GET /api/appointments` - Get appointments (filtered by role)
- `GET /api/appointments/:id` - Get single appointment
- `PATCH /api/appointments/:id/status` - Update status (doctor/staff)
- `PATCH /api/appointments/:id/cancel` - Cancel appointment (patient/staff)

### Patients
- `POST /api/patients/register` - Register patient (staff only)
- `GET /api/patients` - Get all patients (staff only)
- `GET /api/patients/:id` - Get patient (staff/doctor)
- `GET /api/patients/me` - Get current patient profile

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor details
- `GET /api/doctors/:id/available-slots` - Get available time slots

## 🗄️ Database Models

### User
- email (unique)
- password (hashed)
- role (patient/doctor/staff)
- isActive

### Patient
- userId (reference to User)
- firstName, lastName
- dateOfBirth
- gender
- phone
- address
- emergencyContact
- medicalHistory

### Doctor
- userId (reference to User)
- firstName, lastName
- specialization
- phone, email
- consultationFee
- availableDays
- availableHours
- isActive

### Appointment
- patientId (reference to Patient)
- doctorId (reference to Doctor)
- appointmentDate
- appointmentTime
- status (scheduled/completed/cancelled/no-show)
- reason
- consultationNotes
- createdBy (patient/staff)

## 🎨 Design Features

- Clean, healthcare-friendly UI
- Calm color palette (teal/cyan theme)
- Responsive design
- Minimal cognitive load
- Easy-to-use forms
- Clear navigation

## 🧪 Testing the Application

### Create Test Users

#### Option 1: Use Seed Script (Recommended)

Run the seed script to create test doctors and staff:

```bash
cd backend
node scripts/seed.js
```

This will create:
- 1 Staff user: `staff@example.com` / `staff123`
- 3 Doctor users: `doctor1@example.com`, `doctor2@example.com`, `doctor3@example.com` / `doctor123`

#### Option 2: Register Patients

1. **Register a Patient**: Use `/frontend/pages/register.html` or the staff dashboard
2. **Login as Staff**: Use `staff@example.com` / `staff123` to access staff features
3. **Login as Doctor**: Use any doctor email / `doctor123` to access doctor features

#### Option 3: Manual Creation (MongoDB)

You can also create users directly in MongoDB:

```javascript
// In MongoDB shell or Compass
use patient_management

// First create a User
db.users.insertOne({
  email: "doctor@example.com",
  password: "$2a$10$...", // Hashed password (use bcrypt)
  role: "doctor",
  isActive: true
})

// Then create Doctor profile
db.doctors.insertOne({
  userId: ObjectId("..."), // User _id from above
  firstName: "John",
  lastName: "Smith",
  specialization: "Cardiology",
  phone: "+1234567890",
  email: "doctor@example.com",
  availableDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
  availableHours: { start: "09:00", end: "17:00" },
  isActive: true
})
```

## 🔧 Development

### Running in Development Mode

```bash
cd backend
npm run dev  # Uses nodemon for auto-reload
```

### Project Structure Best Practices

- **Models**: Define data schemas
- **Controllers**: Business logic
- **Routes**: API endpoint definitions
- **Middlewares**: Authentication, validation
- **Frontend**: Separate pages for each role

## 📝 Notes

- All passwords are hashed using bcryptjs
- JWT tokens expire after 7 days
- Time slots are generated in 30-minute intervals
- Appointment conflicts are prevented at the database level
- CORS is enabled for frontend-backend communication

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Verify MongoDB port (default: 27017)

### CORS Issues
- Ensure backend CORS middleware is configured
- Check that frontend API URL matches backend port

### Authentication Errors
- Verify JWT_SECRET is set in `.env`
- Check token expiration
- Ensure token is sent in Authorization header

## 📄 License

This project is for educational and portfolio purposes.

## 👨‍💻 Author

Built as a complete full-stack project demonstrating:
- RESTful API design
- MVC architecture
- JWT authentication
- Role-based access control
- MongoDB database design
- Clean, maintainable code

---

**Ready to use!** Follow the setup instructions above to get started.
