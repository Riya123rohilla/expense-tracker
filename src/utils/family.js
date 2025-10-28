// Multi-user family management utilities
import { getLocal, setLocal } from './storage'

// Get all family members
export const getFamilyMembers = () => {
  return getLocal('familyMembers', [
    { id: 'default', name: 'Me', color: '#6366f1', isDefault: true }
  ])
}

// Add a new family member
export const addFamilyMember = (name, color) => {
  const members = getFamilyMembers()
  const newMember = {
    id: Date.now().toString(),
    name,
    color: color || getRandomColor(),
    isDefault: false
  }
  members.push(newMember)
  setLocal('familyMembers', members)
  return newMember
}

// Remove a family member
export const removeFamilyMember = (id) => {
  const members = getFamilyMembers().filter(m => m.id !== id && !m.isDefault)
  setLocal('familyMembers', members)
}

// Get current active member
export const getActiveMember = () => {
  return getLocal('activeMember', 'default')
}

// Set active member
export const setActiveMember = (memberId) => {
  setLocal('activeMember', memberId)
}

// Get transactions for a specific member
export const getTransactionsByMember = (memberId) => {
  const allTransactions = getLocal('transactions', [])
  if (memberId === 'all') return allTransactions
  return allTransactions.filter(t => (t.memberId || 'default') === memberId)
}

// Get member statistics
export const getMemberStats = (memberId) => {
  const transactions = getTransactionsByMember(memberId)
  return transactions.reduce((acc, t) => {
    if (t.type === 'income') acc.income += t.amount
    else acc.expense += t.amount
    acc.count++
    return acc
  }, { income: 0, expense: 0, count: 0, balance: 0 })
}

// Get all members with their stats
export const getAllMembersWithStats = () => {
  const members = getFamilyMembers()
  return members.map(member => {
    const stats = getMemberStats(member.id)
    stats.balance = stats.income - stats.expense
    return { ...member, stats }
  })
}

// Random color generator for new members
const getRandomColor = () => {
  const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#10b981', '#06b6d4', '#3b82f6']
  return colors[Math.floor(Math.random() * colors.length)]
}

// Check if family mode is enabled (more than 1 member)
export const isFamilyModeEnabled = () => {
  return getFamilyMembers().length > 1
}
