import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import AddExpense from './pages/AddExpense'
import Transactions from './pages/Transactions'
import Analytics from './pages/Analytics'
import Reports from './pages/Reports'
import AIAssistant from './pages/AIAssistant'
import FamilyDashboard from './pages/FamilyDashboard'
import Settings from './pages/Settings'
import Login from './pages/Login'
import Register from './pages/Register'
import { getLocal, setLocal } from './utils/storage'

function MainApp() {
  const [theme, setTheme] = useState(getLocal('theme') || 'light')

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    setLocal('theme', theme)
  }, [theme])

  return (
    <div className="min-h-screen flex text-sm">
      <Sidebar theme={theme} setTheme={setTheme} />
      <main className="flex-1 p-6 animate-slide-in">
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/add" element={<ProtectedRoute><AddExpense /></ProtectedRoute>} />
          <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          <Route path="/ai-assistant" element={<ProtectedRoute><AIAssistant /></ProtectedRoute>} />
          <Route path="/family" element={<ProtectedRoute><FamilyDashboard /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings theme={theme} setTheme={setTheme} /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<MainApp />} />
      </Routes>
    </AuthProvider>
  )
}
