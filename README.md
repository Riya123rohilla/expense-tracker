# Expense Tracker (Vite + React + Tailwind)

This is a modern, visually appealing expense tracker app using React, Vite and Tailwind CSS.

## ✨ Features

- 📝 Add income and expenses with categories, dates, and types (saved in localStorage)
- 💳 Transactions list with edit/delete functionality
- 📊 Analytics dashboard with category pie chart and monthly bar chart (Chart.js)
- 📄 **Export reports as PDF, Excel, or CSV** with month filtering
- 💱 **Currency Conversion** - Support for 10 major currencies with live exchange rates
- 👨‍👩‍👧‍👦 **Family Dashboard** - Multi-user expense tracking for families
- 🎤 **Voice Input** - Add expenses by speaking naturally
- 🤖 **AI Financial Assistant** - Get personalized insights, budgeting advice, and money-saving tips
- 🌓 Dark/Light theme toggle with persistence
- 💰 Budget setting with smart alerts (>80% and >100% thresholds)
- 🎨 Beautiful UI with gradients, emojis, and smooth animations
- 📱 Fully responsive design for all screen sizes

## 🎨 Visual Highlights

- Emoji icons throughout the interface
- Gradient backgrounds on cards and buttons
- Smooth hover effects and transitions
- Custom scrollbar design
- Page transition animations
- Enhanced dark mode with proper contrast

See `VISUAL_ENHANCEMENTS.md` for complete details on all visual improvements!

## 🚀 Getting Started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start dev server

   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:5173`

## 📁 Project Structure

```
expense_tracker/
├── src/
│   ├── components/     # Reusable components (Sidebar, SummaryCards, ChartPanel)
│   ├── pages/          # Route pages (Home, AddExpense, Transactions, etc.)
│   ├── utils/          # Utilities (localStorage helpers)
│   ├── App.jsx         # Main app with routing
│   ├── main.jsx        # React entry point
│   └── index.css       # Global styles with Tailwind
├── package.json
├── vite.config.js
├── tailwind.config.cjs
└── README.md
```

### 🤖 AI Financial Assistant

The AI Assistant provides intelligent insights based on your transaction data:

- **Financial Summary** - Quick overview of income, expenses, and balance
- **Budget Analysis** - Real-time budget usage tracking and alerts
- **Spending Insights** - Identify top spending categories
- **Money-Saving Tips** - Personalized advice based on your habits
- **Quick Actions** - Pre-defined queries for instant insights

The AI uses your actual transaction data to provide contextual, personalized advice. It's completely private - all data stays in your browser's localStorage!

## 💾 Data Storage

The app uses browser localStorage with these keys:
- `transactions` - Array of transaction records
- `budget` - Monthly budget amount
- `theme` - Current theme preference (light/dark)

## 🎯 Future Enhancements

- Add recurring transactions
- Multiple budget categories
- Data backup/restore
- PDF report export
- Mobile app (React Native)
- Backend API integration

---

Built with ❤️ using Vite, React, Tailwind CSS, and Chart.js

# Expense-tracker
