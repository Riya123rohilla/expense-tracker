import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js'
import { Pie, Bar } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

export function CategoryPie({data}){
  const labels = Object.keys(data)
  const values = labels.map(l=>data[l])
  const colors = [ '#ef4444','#f97316','#f59e0b','#10b981','#3b82f6','#8b5cf6','#ec4899' ]
  return <Pie data={{ labels, datasets:[{ data: values, backgroundColor: colors.slice(0, labels.length) }] }} />
}

export function MonthlyBar({labels, values}){
  return <Bar data={{ labels, datasets:[{ label:'Amount', data: values, backgroundColor:'#6366f1' }] }} options={{ responsive:true }} />
}

export default function ChartPanel({categoryData, monthly}){
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-card hover:shadow-xl transition-all">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🥧</span>
          <h4 className="font-semibold text-lg">Spending by Category</h4>
        </div>
        <CategoryPie data={categoryData} />
      </div>
      <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-card hover:shadow-xl transition-all">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">📈</span>
          <h4 className="font-semibold text-lg">Monthly Totals</h4>
        </div>
        <MonthlyBar labels={monthly.labels} values={monthly.values} />
      </div>
    </div>
  )
}
