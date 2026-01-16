# Quick Setup Guide

## Step-by-Step Setup

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
# Create a new file named .env with the following content:
```

Create `backend/.env`:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/patient_management
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_min_32_chars
NODE_ENV=development
```

**Important**: 
- Change `JWT_SECRET` to a strong random string (at least 32 characters)
- If using MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string

### 2. Start MongoDB

**Local MongoDB:**
```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
```

**MongoDB Atlas (Cloud):**
- Create account at https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get connection string
- Update `MONGODB_URI` in `.env`

### 3. Start Backend Server

```bash
cd backend
npm start

# For development (auto-reload):
npm run dev
```

Server should start on `http://localhost:3000`

### 4. Seed Test Data (Optional but Recommended)

```bash
cd backend
node scripts/seed.js
```

This creates:
- Staff account: `staff@example.com` / `staff123`
- 3 Doctor accounts: `doctor1@example.com`, `doctor2@example.com`, `doctor3@example.com` / `doctor123`

### 5. Frontend Setup

**Option A: Using a Local Web Server (Recommended)**

```bash
# Using Python
cd frontend
python -m http.server 8000

# Using Node.js http-server
npx http-server frontend -p 8000
```

Then open: `http://localhost:8000/pages/index.html`

**Option B: Direct File Opening**

Open `frontend/pages/index.html` directly in your browser.

**Note**: If you encounter CORS issues, use Option A.

### 6. Test the Application

1. Open the landing page
2. Register a new patient account
3. Login with patient credentials
4. Book an appointment
5. Login as staff (`staff@example.com` / `staff123`) to see staff features
6. Login as doctor (`doctor1@example.com` / `doctor123`) to see doctor features

## Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Verify MongoDB port (default: 27017)

### Port Already in Use
- Change `PORT` in `.env` to a different port (e.g., 3001)
- Update `API_BASE_URL` in `frontend/js/api.js` if needed

### CORS Errors
- Use a local web server for frontend (not direct file opening)
- Ensure backend CORS is enabled (already configured)

### Authentication Errors
- Verify `JWT_SECRET` is set in `.env`
- Check browser console for errors
- Ensure token is stored in localStorage

## Next Steps

- Register patients through the registration page
- Book appointments
- Test all three user roles
- Explore the codebase to understand the architecture

Happy coding! 🚀
