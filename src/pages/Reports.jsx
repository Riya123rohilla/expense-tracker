import React, { useState } from 'react'
import { getLocal } from '../utils/storage'
import { exportToPDF, exportToExcel } from '../utils/export'

function toCSV(rows){
  if(!rows || rows.length===0) return ''
  const keys = Object.keys(rows[0])
  const csv = [keys.join(',')]
  for(const r of rows){
    csv.push(keys.map(k=>`"${String(r[k]).replace(/"/g,'""')}"`).join(','))
  }
  return csv.join('\n')
}

export default function Reports(){
  const all = getLocal('transactions', [])
  const [month, setMonth] = useState('')
  const filtered = month ? all.filter(t => t.date.startsWith(month)) : all

  const exportCSV = ()=>{
    const csv = toCSV(filtered)
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `transactions${month?'-'+month:''}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleExportPDF = () => {
    exportToPDF(filtered, { month })
  }

  const handleExportExcel = () => {
    exportToExcel(filtered, { month })
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">📄</span>
        <h2 className="text-2xl font-bold">Reports</h2>
      </div>
      <div className="mb-4 flex items-center gap-3 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-card flex-wrap">
        <span className="text-xl">🗓️</span>
        <input type="month" value={month} onChange={e=>setMonth(e.target.value)} className="p-2 border rounded dark:bg-slate-700 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none" />
        <div className="flex gap-2 flex-wrap">
          <button onClick={exportCSV} className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2">
            <span>📄</span> CSV
          </button>
          <button onClick={handleExportPDF} className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg hover:from-red-700 hover:to-rose-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2">
            <span>�</span> PDF
          </button>
          <button onClick={handleExportExcel} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2">
            <span>📊</span> Excel
          </button>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 ml-auto">
          {filtered.length} transactions
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-card overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-gray-50 dark:bg-slate-700">
            <tr>
              <th className="p-3 font-semibold text-left">Title</th>
              <th className="p-3 font-semibold text-left">Category</th>
              <th className="p-3 font-semibold text-left">Amount</th>
              <th className="p-3 font-semibold text-left">Date</th>
              <th className="p-3 font-semibold text-left">Type</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t=> (
              <tr key={t.id} className="border-b hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-all">
                <td className="p-3">{t.title}</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-slate-700 rounded text-xs">{t.category}</span>
                </td>
                <td className="p-3 font-semibold">${t.amount.toFixed(2)}</td>
                <td className="p-3 text-gray-600 dark:text-gray-400">{t.date}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${t.type==='income' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300'}`}>
                    {t.type==='income' ? '💰 Income' : '💸 Expense'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
