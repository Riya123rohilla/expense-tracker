import React, { useState } from 'react'
import { getAllMembersWithStats, addFamilyMember, removeFamilyMember, getFamilyMembers } from '../utils/family'
import { getLocal } from '../utils/storage'

export default function FamilyDashboard() {
  const [members, setMembers] = useState(getAllMembersWithStats())
  const [showAddForm, setShowAddForm] = useState(false)
  const [newMemberName, setNewMemberName] = useState('')
  const [selectedColor, setSelectedColor] = useState('#6366f1')

  const colors = [
    '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', 
    '#f97316', '#10b981', '#06b6d4', '#3b82f6'
  ]

  const handleAddMember = (e) => {
    e.preventDefault()
    if (!newMemberName.trim()) return
    
    addFamilyMember(newMemberName.trim(), selectedColor)
    setMembers(getAllMembersWithStats())
    setNewMemberName('')
    setShowAddForm(false)
  }

  const handleRemoveMember = (id) => {
    if (!confirm('Remove this family member? Their transactions will remain but won\'t be associated with them.')) return
    removeFamilyMember(id)
    setMembers(getAllMembersWithStats())
  }

  const allTransactions = getLocal('transactions', [])
  const totalStats = allTransactions.reduce((acc, t) => {
    if (t.type === 'income') acc.income += t.amount
    else acc.expense += t.amount
    return acc
  }, { income: 0, expense: 0 })
  totalStats.balance = totalStats.income - totalStats.expense

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl">👨‍👩‍👧‍👦</span>
          <div>
            <h2 className="text-2xl font-bold">Family Dashboard</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Manage family members and track shared expenses</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md flex items-center gap-2"
        >
          <span>➕</span> Add Member
        </button>
      </div>

      {/* Add Member Form */}
      {showAddForm && (
        <div className="mb-6 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-card">
          <h3 className="font-semibold mb-3">Add Family Member</h3>
          <form onSubmit={handleAddMember} className="flex flex-col gap-3">
            <div>
              <label className="text-xs text-gray-600 dark:text-gray-400 font-semibold">Name</label>
              <input
                value={newMemberName}
                onChange={e => setNewMemberName(e.target.value)}
                className="w-full mt-1 p-2 border rounded dark:bg-slate-700 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Enter name"
                autoFocus
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 dark:text-gray-400 font-semibold">Color</label>
              <div className="flex gap-2 mt-2">
                {colors.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full transition-all ${selectedColor === color ? 'ring-4 ring-offset-2 ring-indigo-500' : ''}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Add
              </button>
              <button
                type="button"
                onClick={() => { setShowAddForm(false); setNewMemberName('') }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Family Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg shadow-card">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">💰</span>
            <div className="text-xs text-gray-600 dark:text-gray-400">Family Income</div>
          </div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">${totalStats.income.toFixed(2)}</div>
        </div>
        <div className="p-5 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-lg shadow-card">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">💸</span>
            <div className="text-xs text-gray-600 dark:text-gray-400">Family Expenses</div>
          </div>
          <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">${totalStats.expense.toFixed(2)}</div>
        </div>
        <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg shadow-card">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">💵</span>
            <div className="text-xs text-gray-600 dark:text-gray-400">Family Balance</div>
          </div>
          <div className={`text-2xl font-bold ${totalStats.balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}`}>
            ${totalStats.balance.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Family Members */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map(member => (
          <div key={member.id} className="p-5 bg-white dark:bg-slate-800 rounded-lg shadow-card hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: member.color }}
                >
                  {member.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{member.stats.count} transactions</p>
                </div>
              </div>
              {!member.isDefault && (
                <button
                  onClick={() => handleRemoveMember(member.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  🗑️
                </button>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Income</span>
                <span className="font-semibold text-green-600 dark:text-green-400">${member.stats.income.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Expenses</span>
                <span className="font-semibold text-rose-600 dark:text-rose-400">${member.stats.expense.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t dark:border-slate-700">
                <span className="text-sm font-semibold">Balance</span>
                <span className={`font-bold ${member.stats.balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}`}>
                  ${member.stats.balance.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  style={{ width: `${Math.min((member.stats.income / Math.max(totalStats.income, 1)) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {((member.stats.income / Math.max(totalStats.income, 1)) * 100).toFixed(1)}% of family income
              </p>
            </div>
          </div>
        ))}
      </div>

      {members.length === 1 && (
        <div className="mt-6 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-center">
          <span className="text-4xl mb-3 block">👨‍👩‍👧‍👦</span>
          <h3 className="font-semibold mb-2">Start Your Family Dashboard</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Add family members to track individual and shared expenses
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Add First Family Member
          </button>
        </div>
      )}
    </div>
  )
}
