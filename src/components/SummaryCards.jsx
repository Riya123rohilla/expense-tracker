import React from 'react'

export default function SummaryCards({income, expense}){
  const balance = income - expense
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg shadow-card fade hover:shadow-lg transition-all">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">💰</span>
          <div className="text-xs text-gray-600 dark:text-gray-400">Total Income</div>
        </div>
        <div className="text-2xl font-bold text-green-600 dark:text-green-400">${income.toFixed(2)}</div>
      </div>
      <div className="p-5 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-lg shadow-card fade hover:shadow-lg transition-all">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">💸</span>
          <div className="text-xs text-gray-600 dark:text-gray-400">Total Expense</div>
        </div>
        <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">${expense.toFixed(2)}</div>
      </div>
      <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg shadow-card fade hover:shadow-lg transition-all">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">💵</span>
          <div className="text-xs text-gray-600 dark:text-gray-400">Balance</div>
        </div>
        <div className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}`}>${balance.toFixed(2)}</div>
      </div>
    </div>
  )
}
