# MongoDB Setup for Expense Tracker

## Quick Setup with MongoDB Atlas (Recommended - 5 minutes)

### Step 1: Create Free MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google or create account
3. Choose FREE tier (M0)

### Step 2: Create a Cluster
1. Click "Build a Database"
2. Choose "FREE" shared cluster
3. Select AWS and a region close to you (e.g., Mumbai for India)
4. Click "Create"
5. Wait 3-5 minutes for cluster creation

### Step 3: Create Database User
1. Security → Database Access
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `expenseadmin`
5. Password: Click "Autogenerate Secure Password" (copy it!)
   Or create your own strong password
6. Database User Privileges: "Atlas admin"
7. Click "Add User"

### Step 4: Whitelist IP Address
1. Security → Network Access
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Database" tab
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Driver: Node.js, Version: 4.1 or later
5. Copy the connection string:
   ```
   mongodb+srv://expenseadmin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 6: Update backend/.env
Replace `<password>` with your actual password and add database name:

```env
MONGO_URI=mongodb+srv://expenseadmin:YOUR_PASSWORD_HERE@cluster0.xxxxx.mongodb.net/expense_tracker?retryWrites=true&w=majority
```

Example:
```env
MONGO_URI=mongodb+srv://expenseadmin:MyPass123@cluster0.abc123.mongodb.net/expense_tracker?retryWrites=true&w=majority
```

---

## Alternative: Local MongoDB Installation (Ubuntu/Linux)

If you prefer local installation:

```bash
# Import MongoDB GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update and install
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify
sudo systemctl status mongod
```

For local MongoDB, keep the default in backend/.env:
```env
MONGO_URI=mongodb://localhost:27017/expense_tracker
```

---

## Next Steps

After setting up MongoDB (Atlas or Local):

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. You should see:
   ```
   ✅ MongoDB Connected Successfully
   🚀 Server running on port 5000
   ```

3. Test the API:
   ```bash
   curl http://localhost:5000/api/health
   ```

---

## Troubleshooting

**Error: "bad auth Authentication failed"**
- Check username/password in connection string
- Ensure password doesn't have special characters or URL-encode them

**Error: "IP not whitelisted"**
- Add 0.0.0.0/0 to Network Access in Atlas

**Error: "ECONNREFUSED"**
- MongoDB is not running (if local)
- Check connection string format

---

**Choose MongoDB Atlas (cloud) for easiest setup!** ☁️
