# 🎉 Expense Tracker - HOSTED AND RUNNING!

## ✅ Your Application is Now Live!

### 🚀 Access Your Application:

**Frontend (React):** http://localhost:5173/
**Backend API:** http://localhost:5000/api
**Health Check:** http://localhost:5000/api/health

---

## 🎯 What's Running:

### ✅ Backend Server (Port 5000)
- **Status:** Running with MongoDB
- **Database:** MongoDB (Local) - Connected Successfully
- **Authentication:** JWT-based with bcrypt password hashing
- **API Endpoints:** 
  - Auth: `/api/auth` (register, login, profile)
  - Expenses: `/api/expenses` (CRUD operations)
  - Stats: `/api/expenses/stats/summary`

### ✅ Frontend Server (Port 5173)
- **Status:** Running with Vite + React
- **Features:** All original features + Authentication
- **Theme:** Dark/Light mode support
- **Authentication:** Login/Register pages added

---

## 📋 How to Use:

### Step 1: Register a New Account
1. Open http://localhost:5173/
2. You'll be redirected to the login page
3. Click "Sign up" to register
4. Fill in:
   - Name
   - Email
   - Password (min 6 characters)
   - Preferred Currency
   - Monthly Budget (optional)
5. Click "Create Account"

### Step 2: Start Using the App
After registration, you'll be automatically logged in and can:
- ✅ Add expenses/income
- ✅ View dashboard with statistics
- ✅ See analytics with charts
- ✅ Export reports (PDF/Excel)
- ✅ Use AI assistant
- ✅ Manage family expenses
- ✅ Track budget progress

### Step 3: Your Data is Saved in MongoDB
All your expenses are now stored in MongoDB database, not localStorage!
- Data persists even after browser refresh
- Secure authentication with JWT tokens
- Each user has their own private data

---

## 🔐 Authentication Features:

- **Secure Registration:** Passwords hashed with bcrypt
- **JWT Tokens:** Secure token-based authentication
- **Protected Routes:** Must be logged in to access app
- **Auto-login:** Token stored in localStorage
- **Logout:** Available in Sidebar

---

## 📁 Project Structure:

```
expense_tracker/
├── backend/                 # Node.js + Express Backend
│   ├── models/             # MongoDB models (User, Expense)
│   ├── controllers/        # Business logic
│   ├── routes/             # API routes
│   ├── middleware/         # JWT authentication
│   ├── server.js           # Express server
│   └── .env                # Environment variables
│
├── src/                     # React Frontend
│   ├── components/         # UI components + ProtectedRoute
│   ├── context/            # AuthContext for authentication
│   ├── pages/              # All pages + Login + Register
│   ├── services/           # API service (axios)
│   └── utils/              # Utility functions
│
└── README.md               # This file
```

---

## 🛠️ Technology Stack:

### Backend:
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database (Running locally)
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcrypt.js** - Password hashing
- **CORS** - Cross-origin support

### Frontend:
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Chart.js** - Analytics charts
- **jsPDF** - PDF export
- **XLSX** - Excel export

---

## 🔄 Managing Servers:

### To Stop Servers:
```bash
# Stop backend
pkill -f "node server.js"

# Stop frontend
pkill -f "vite"
```

### To Restart Servers:

**Backend:**
```bash
cd /home/admin-063/Desktop/expense_tracker/backend
nohup node server.js > backend.log 2>&1 &
```

**Frontend:**
```bash
cd /home/admin-063/Desktop/expense_tracker
npm run dev
```

### To Check Logs:
```bash
# Backend logs
cd /home/admin-063/Desktop/expense_tracker/backend
tail -f backend.log

# Frontend logs (in terminal where npm run dev is running)
```

---

## 📊 Database Information:

**MongoDB Status:**
```bash
sudo systemctl status mongod
```

**Connect to MongoDB:**
```bash
mongosh
use expense_tracker
db.users.find()
db.expenses.find()
```

**Database Location:** `mongodb://localhost:27017/expense_tracker`

---

## 🧪 Testing the API:

### Health Check:
```bash
curl http://localhost:5000/api/health
```

### Register User:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123",
    "currency": "USD",
    "budget": 5000
  }'
```

### Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'
```

---

## 🎨 Features Available:

### Original Features (Now with Database):
- ✅ Dashboard with summary cards
- ✅ Add/Edit/Delete expenses
- ✅ Income and expense tracking
- ✅ Category-based organization
- ✅ Analytics with pie & bar charts
- ✅ Export to PDF/Excel/CSV
- ✅ AI Financial Assistant
- ✅ Multi-user family dashboard
- ✅ Currency conversion (10 currencies)
- ✅ Voice input for expenses
- ✅ Dark/Light theme
- ✅ Budget tracking & alerts
- ✅ Responsive design

### New Features:
- ✅ User Registration & Login
- ✅ Secure JWT Authentication
- ✅ Password hashing (bcrypt)
- ✅ Protected routes
- ✅ MongoDB database storage
- ✅ RESTful API backend
- ✅ User-specific data isolation
- ✅ Persistent data storage

---

## 🚨 Troubleshooting:

### Frontend won't load:
1. Check if Vite is running: Look for "http://localhost:5173/" message
2. Check browser console for errors (F12)
3. Make sure port 5173 is not blocked

### Backend connection error:
1. Check if backend is running: `curl http://localhost:5000/api/health`
2. Check MongoDB status: `sudo systemctl status mongod`
3. View backend logs: `cat backend/backend.log`

### MongoDB not running:
```bash
sudo systemctl start mongod
sudo systemctl enable mongod
```

### "Cannot connect to API" error:
- Make sure backend is running on port 5000
- Check CORS settings in backend/server.js
- Verify API URL in frontend (src/services/api.js)

---

## 🔐 Security Notes:

1. **JWT Secret:** Change `JWT_SECRET` in `backend/.env` for production
2. **Password:** Always use strong passwords
3. **HTTPS:** Use HTTPS in production
4. **Environment Variables:** Never commit `.env` files to git

---

## 📱 Next Steps:

1. **✅ Register your account** at http://localhost:5173/register
2. **✅ Login** and start tracking expenses
3. **✅ Add some expenses** to test the database
4. **✅ Check MongoDB** to see your data: `mongosh` → `use expense_tracker` → `db.expenses.find()`
5. **✅ Try all features** - everything now saves to database!

---

## 🎯 Quick Links:

- **Frontend:** http://localhost:5173/
- **API Health:** http://localhost:5000/api/health
- **Register:** http://localhost:5173/register
- **Login:** http://localhost:5173/login

---

## 💡 Pro Tips:

1. **Keep both servers running** - Backend (5000) + Frontend (5173)
2. **MongoDB must be running** - Check with `sudo systemctl status mongod`
3. **Use Logout button** in sidebar when done
4. **Data persists** across browser sessions
5. **Each user** has their own private data

---

## 🎉 Congratulations!

Your Expense Tracker is now a **full-stack application** with:
- ✅ MongoDB database
- ✅ RESTful API backend
- ✅ Secure authentication
- ✅ React frontend
- ✅ All features working

**Start using it now at:** http://localhost:5173/

---

*Built with ❤️ using MERN Stack (MongoDB, Express, React, Node.js)*
