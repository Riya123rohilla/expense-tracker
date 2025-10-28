import React, { useEffect, useState } from 'react'
import { getLocal, setLocal } from '../utils/storage'

function TransactionRow({tx, onEdit, onDelete, budget}){
  const over80 = budget>0 && tx.amount >= 0.8*budget && tx.amount < budget
  const over100 = budget>0 && tx.amount >= budget
  return (
    <tr className="border-b hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-all">
      <td className="p-3">{tx.title}</td>
      <td className="p-3">
        <span className="px-2 py-1 bg-gray-100 dark:bg-slate-700 rounded text-xs">{tx.category}</span>
      </td>
      <td className={`p-3 font-semibold ${tx.type==='income' ? 'text-green-600 dark:text-green-400' : 'text-rose-600 dark:text-rose-400'}`}>
        {tx.type==='income' ? '💰' : '💸'} ${tx.amount.toFixed(2)}
      </td>
      <td className="p-3 text-gray-600 dark:text-gray-400">{tx.date}</td>
      <td className="p-3">
        {over100 && <span className="text-xs bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 px-2 py-1 rounded-full">🚨 Over Budget</span>}
        {over80 && <span className="text-xs bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 px-2 py-1 rounded-full">⚠️ Near Budget</span>}
      </td>
      <td className="p-3">
        <button onClick={()=>onEdit(tx)} className="text-indigo-600 dark:text-indigo-400 hover:underline mr-3">✏️ Edit</button>
        <button onClick={()=>onDelete(tx.id)} className="text-rose-600 dark:text-rose-400 hover:underline">🗑️ Delete</button>
      </td>
    </tr>
  )
}

export default function Transactions(){
  const [transactions, setTransactions] = useState(getLocal('transactions', []))
  const [editing, setEditing] = useState(null)
  const [budget, setBudget] = useState(getLocal('budget') || 0)

  useEffect(()=>{
    setLocal('transactions', transactions)
  }, [transactions])

  useEffect(()=>{
    setBudget(getLocal('budget') || 0)
  }, [])

  const remove = (id)=>{
    if(!confirm('Delete this transaction?')) return
    setTransactions(s=>s.filter(t=>t.id!==id))
  }

  const saveEdit = (e)=>{
    e.preventDefault()
    const form = e.target
    const id = Number(form.id.value)
    setTransactions(s=> s.map(t=> t.id===id ? { ...t, title:form.title.value, amount:Number(form.amount.value), category:form.category.value, date:form.date.value, type:form.type.value } : t))
    setEditing(null)
  }

  const totals = transactions.reduce((acc,t)=>{
    if(t.type==='income') acc.income += t.amount
    else acc.expense += t.amount
    return acc
  }, {income:0, expense:0})

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">💳</span>
        <h2 className="text-2xl font-bold">Transactions</h2>
      </div>
      <div className="mb-4 flex items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-lg shadow-card">
        <div className="text-sm text-gray-600 dark:text-gray-400">📋 Total Records: <strong>{transactions.length}</strong></div>
        <div className="text-sm flex items-center gap-4">
          <span>💰 Income: <strong className="text-green-600 dark:text-green-400">${totals.income.toFixed(2)}</strong></span>
          <span>💸 Expense: <strong className="text-rose-600 dark:text-rose-400">${totals.expense.toFixed(2)}</strong></span>
        </div>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-lg shadow-card">
        <table className="w-full text-left">
          <thead className="border-b bg-gray-50 dark:bg-slate-700">
            <tr>
              <th className="p-3 font-semibold">Title</th>
              <th className="p-3 font-semibold">Category</th>
              <th className="p-3 font-semibold">Amount</th>
              <th className="p-3 font-semibold">Date</th>
              <th className="p-3 font-semibold">Alert</th>
              <th className="p-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx=> <TransactionRow key={tx.id} tx={tx} onEdit={t=>setEditing(t)} onDelete={remove} budget={budget} />)}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="mt-6 p-6 bg-white dark:bg-slate-800 rounded-lg shadow-card">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><span className="text-2xl">✏️</span> Edit Transaction</h3>
          <form onSubmit={saveEdit}>
            <input type="hidden" name="id" defaultValue={editing.id} />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input name="title" defaultValue={editing.title} className="p-2 border rounded dark:bg-slate-700 dark:border-slate-600" />
              <input name="amount" type="number" step="0.01" defaultValue={editing.amount} className="p-2 border rounded dark:bg-slate-700 dark:border-slate-600" />
              <input name="category" defaultValue={editing.category} className="p-2 border rounded dark:bg-slate-700 dark:border-slate-600" />
              <input name="date" type="date" defaultValue={editing.date} className="p-2 border rounded dark:bg-slate-700 dark:border-slate-600" />
              <select name="type" defaultValue={editing.type} className="p-2 border rounded dark:bg-slate-700 dark:border-slate-600">
                <option value="expense">💸 Expense</option>
                <option value="income">💰 Income</option>
              </select>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md">💾 Save</button>
              <button type="button" onClick={()=>setEditing(null)} className="px-6 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-all">✖️ Cancel</button>
            </div>
          </form>
        </div>
      )}

    </div>
  )
}
