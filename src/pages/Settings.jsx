import React from 'react'
import { getLocal, setLocal } from '../utils/storage'

export default function Settings({ theme, setTheme }){
  const budget = getLocal('budget') || 0
  const setBudget = (v)=> setLocal('budget', Number(v))

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">⚙️</span>
        <h2 className="text-2xl font-bold">Settings</h2>
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-card p-6 max-w-xl">
        <div className="flex items-center justify-between mb-6 pb-4 border-b dark:border-slate-700">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{theme === 'light' ? '☀️' : '🌙'}</span>
            <div>
              <div className="text-sm font-semibold">Theme</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Toggle between light and dark mode</div>
            </div>
          </div>
          <div>
            <button onClick={()=>setTheme(t=> t==='light' ? 'dark' : 'light')} className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md">{theme === 'light' ? 'Light' : 'Dark'}</button>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">💰</span>
            <label className="text-sm font-semibold">Monthly Budget</label>
          </div>
          <input defaultValue={budget} onBlur={e=>setBudget(e.target.value)} className="w-full mt-1 p-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="Enter your budget amount" />
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-1">
            <span>ℹ️</span>
            <span>Set your monthly budget for alerts and notifications when expenses exceed thresholds.</span>
          </div>
        </div>
      </div>
    </div>
  )
}
