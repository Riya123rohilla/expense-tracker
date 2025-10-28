import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const routes = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/add', label: 'Add Expense', icon: '➕' },
  { to: '/transactions', label: 'Transactions', icon: '💳' },
  { to: '/analytics', label: 'Analytics', icon: '📊' },
  { to: '/reports', label: 'Reports', icon: '📄' },
  { to: '/family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
  { to: '/ai-assistant', label: 'AI Assistant', icon: '🤖' },
  { to: '/settings', label: 'Settings', icon: '⚙️' },
]

export default function Sidebar({ theme, setTheme }){
  const [open, setOpen] = useState(true)
  return (
    <aside className={`border-r h-screen p-4 transition-all duration-200 ${open ? 'w-64' : 'w-16'}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-md shadow-card flex items-center justify-center text-white font-bold">ET</div>
          {open && <div>
            <h3 className="font-semibold">Expense Tracker</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Personal finance UI</p>
          </div>}
        </div>
        <button onClick={()=>setOpen(s=>!s)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-800">{open ? '«' : '»'}</button>
      </div>

      <nav className="flex flex-col gap-1">
        {routes.map(r=> (
          <NavLink key={r.to} to={r.to} className={({isActive})=>`flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 transition-all ${isActive ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 shadow-sm' : 'text-gray-600 dark:text-gray-300'}`}>
            <span className="w-6 text-center text-lg">{r.icon}</span>
            {open && <span>{r.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="mt-6 pt-4 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{theme === 'light' ? '☀️' : '🌙'}</span>
            {open && <div className="text-xs text-gray-500 dark:text-gray-400">Theme</div>}
          </div>
          {open && <div>
            <button onClick={()=>setTheme(t => t === 'light' ? 'dark' : 'light')} className="px-3 py-1 rounded bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 transition-all text-xs">{theme === 'light' ? 'Light' : 'Dark'}</button>
          </div>}
        </div>
      </div>

    </aside>
  )
}
