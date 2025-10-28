import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import AddExpense from './pages/AddExpense'
import Transactions from './pages/Transactions'
import Analytics from './pages/Analytics'
import Reports from './pages/Reports'
import AIAssistant from './pages/AIAssistant'
import FamilyDashboard from './pages/FamilyDashboard'
import Settings from './pages/Settings'
import { getLocal, setLocal } from './utils/storage'

export default function App(){
  const [theme, setTheme] = useState(getLocal('theme') || 'light')

  useEffect(()=>{
    const root = document.documentElement
    if(theme === 'dark'){
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
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddExpense />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/family" element={<FamilyDashboard />} />
          <Route path="/settings" element={<Settings theme={theme} setTheme={setTheme} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}
