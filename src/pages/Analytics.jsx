import React from 'react'
import ChartPanel from '../components/ChartPanel'
import { getLocal } from '../utils/storage'

export default function Analytics(){
  const transactions = getLocal('transactions', [])

  const categoryData = transactions.reduce((acc,t)=>{ if(!acc[t.category]) acc[t.category]=0; if(t.type==='expense') acc[t.category]+=t.amount; return acc }, {})

  // build monthly totals for past 12 months
  const months = []
  const now = new Date()
  for(let i=11;i>=0;i--){
    const d = new Date(now.getFullYear(), now.getMonth()-i, 1)
    months.push(`${d.toLocaleString(undefined,{month:'short'})} ${d.getFullYear()}`)
  }
  const monthlyValues = months.map(m=>0)

  transactions.forEach(t=>{
    const dt = new Date(t.date)
    const label = `${dt.toLocaleString(undefined,{month:'short'})} ${dt.getFullYear()}`
    const idx = months.indexOf(label)
    if(idx>=0){ if(t.type==='expense') monthlyValues[idx]+=t.amount; else monthlyValues[idx]-=t.amount }
  })

  const monthly = { labels: months, values: monthlyValues }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">📊</span>
        <h2 className="text-2xl font-bold">Analytics</h2>
      </div>
      <ChartPanel categoryData={categoryData} monthly={monthly} />
    </div>
  )
}
