import React from 'react'
import SummaryCards from '../components/SummaryCards'

export default function Home(){
  // For home we show static intro and placeholder summary (real values come from transactions page)
  return (
    <div>
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-5xl">💼</span>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">Welcome to Expense Tracker</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Track your income and expenses, visualize analytics, and export reports.</p>
          </div>
        </div>
      </header>

      <SummaryCards income={1234.56} expense={678.9} />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
        <article className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-card hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div className="text-4xl mb-3">⚡</div>
          <h3 className="font-semibold text-lg mb-2">Quickly Add Expenses</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Add new records with categories, date and type in a simple form.</p>
        </article>
        <article className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-card hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div className="text-4xl mb-3">📈</div>
          <h3 className="font-semibold text-lg mb-2">Visual Analytics</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">See spending distribution by category and monthly trends.</p>
        </article>
        <article className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-card hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div className="text-4xl mb-3">🤖</div>
          <h3 className="font-semibold text-lg mb-2">AI Assistant</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Get personalized insights, budgeting tips, and financial advice.</p>
        </article>
      </section>
    </div>
  )
}
