import React, { useState, useEffect } from 'react'
import { getLocal, setLocal } from '../utils/storage'
import { startVoiceRecognition, isVoiceSupported } from '../utils/voice'
import { CURRENCIES } from '../utils/currency'
import { getActiveMember, getFamilyMembers } from '../utils/family'

const defaultCategories = ['Food','Transport','Salary','Bills','Shopping','Other']

export default function AddExpense(){
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(defaultCategories[0])
  const [date, setDate] = useState('')
  const [type, setType] = useState('expense')
  const [message, setMessage] = useState(null)
  const [budget, setBudget] = useState(getLocal('budget') || 0)
  const [currency, setCurrency] = useState(getLocal('currency') || 'USD')
  const [isListening, setIsListening] = useState(false)
  const [voiceTranscript, setVoiceTranscript] = useState('')
  const [memberId, setMemberId] = useState(getActiveMember())
  const familyMembers = getFamilyMembers()

  useEffect(()=>{
    const today = new Date().toISOString().slice(0,10)
    setDate(today)
  }, [])

  const handleVoiceInput = () => {
    if (!isVoiceSupported()) {
      setMessage({ type: 'error', text: 'Voice input not supported in your browser' })
      return
    }

    setIsListening(true)
    setVoiceTranscript('Listening...')

    startVoiceRecognition(
      (parsed, transcript) => {
        setIsListening(false)
        setVoiceTranscript(transcript)
        
        // Auto-fill form fields
        if (parsed.amount) setAmount(parsed.amount.toString())
        if (parsed.title) setTitle(parsed.title)
        if (parsed.category) setCategory(parsed.category)
        if (parsed.type) setType(parsed.type)
        
        setMessage({ type: 'success', text: `Voice command recognized: "${transcript}"` })
        
        // Clear transcript after 3 seconds
        setTimeout(() => setVoiceTranscript(''), 3000)
      },
      (error) => {
        setIsListening(false)
        setVoiceTranscript('')
        setMessage({ type: 'error', text: `Voice error: ${error}` })
      }
    )
  }

  const save = (e)=>{
    e.preventDefault()
    const amt = Number(amount)
    if(!title || !amt || !date){ setMessage({type:'error', text:'Please fill required fields'}); return }
    const tx = { id: Date.now(), title, amount: amt, category, date, type, currency, memberId }
    const all = getLocal('transactions', [])
    all.unshift(tx)
    setLocal('transactions', all)
    setLocal('currency', currency) // Save currency preference

    // budget alert
    if(budget>0){
      if(amt >= budget) setMessage({type:'danger', text:`Expense >= budget (${budget})!`})
      else if(amt >= 0.8*budget) setMessage({type:'warn', text:`Expense over 80% of budget!`})
      else setMessage({type:'success', text:'Saved'});
    } else {
      setMessage({type:'success', text:'Saved'})
    }

    // clear
    setTitle(''); setAmount(''); setCategory(defaultCategories[0])
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">➕</span>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">Add Expense / Income</h2>
          {voiceTranscript && (
            <div className="text-sm text-indigo-600 dark:text-indigo-400 mt-1">
              🎤 {voiceTranscript}
            </div>
          )}
        </div>
        {isVoiceSupported() && (
          <button
            onClick={handleVoiceInput}
            disabled={isListening}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
              isListening
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100'
            }`}
          >
            <span className="text-2xl">🎤</span>
            <span className="text-sm font-medium">{isListening ? 'Listening...' : 'Voice Input'}</span>
          </button>
        )}
      </div>
      <form onSubmit={save} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl bg-white dark:bg-slate-800 p-6 rounded-lg shadow-card">
        <div>
          <label className="text-xs text-gray-600 dark:text-gray-400 font-semibold">Title</label>
          <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full mt-1 p-2 rounded border dark:bg-slate-700 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="e.g., Grocery" />
        </div>
        <div>
          <label className="text-xs text-gray-600 dark:text-gray-400 font-semibold">Amount</label>
          <div className="flex gap-2">
            <select value={currency} onChange={e=>setCurrency(e.target.value)} className="mt-1 p-2 rounded border dark:bg-slate-700 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
              {Object.entries(CURRENCIES).map(([code, curr]) => (
                <option key={code} value={code}>{curr.symbol} {code}</option>
              ))}
            </select>
            <input type="number" step="0.01" value={amount} onChange={e=>setAmount(e.target.value)} className="flex-1 mt-1 p-2 rounded border dark:bg-slate-700 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="0.00" />
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-600 dark:text-gray-400 font-semibold">Category</label>
          <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full mt-1 p-2 rounded border dark:bg-slate-700 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
            {defaultCategories.map(c=> <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="text-xs text-gray-600 dark:text-gray-400 font-semibold">Date</label>
          <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="w-full mt-1 p-2 rounded border dark:bg-slate-700 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
        </div>

        <div>
          <label className="text-xs text-gray-600 dark:text-gray-400 font-semibold">Type</label>
          <select value={type} onChange={e=>setType(e.target.value)} className="w-full mt-1 p-2 rounded border dark:bg-slate-700 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
            <option value="expense">💸 Expense</option>
            <option value="income">💰 Income</option>
          </select>
        </div>

        {familyMembers.length > 1 && (
          <div>
            <label className="text-xs text-gray-600 dark:text-gray-400 font-semibold">Family Member</label>
            <select value={memberId} onChange={e=>setMemberId(e.target.value)} className="w-full mt-1 p-2 rounded border dark:bg-slate-700 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
              {familyMembers.map(m => <option key={m.id} value={m.id}>👤 {m.name}</option>)}
            </select>
          </div>
        )}

        <div className={familyMembers.length > 1 ? '' : 'sm:col-span-2'}>
          <label className="text-xs text-gray-600 dark:text-gray-400 font-semibold">Budget (optional)</label>
          <input type="number" value={budget} onChange={e=>{ setBudget(Number(e.target.value)); setLocal('budget', Number(e.target.value)) }} className="w-full mt-1 p-2 rounded border dark:bg-slate-700 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
          <div className="text-xs text-gray-400 mt-1">Set a monthly budget to enable alerts when an expense crosses thresholds.</div>
        </div>

        <div className="sm:col-span-2 flex items-center gap-3 flex-wrap">
          <button className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">💾 Save</button>
          <button type="button" onClick={()=>{ setTitle(''); setAmount(''); setCategory(defaultCategories[0]); setMessage(null) }} className="px-6 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-all">🔄 Reset</button>
          {message && <div className={`px-4 py-2 rounded-lg text-sm font-medium ${message.type==='danger'?'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300':message.type==='warn'?'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300':message.type==='error'?'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300':'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'}`}>{message.text}</div>}
        </div>
      </form>
    </div>
  )
}
