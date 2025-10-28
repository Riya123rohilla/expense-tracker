import React, { useState, useEffect, useRef } from 'react'
import { getLocal } from '../utils/storage'

// AI Assistant helper to generate responses based on user's transaction data
const generateAIResponse = (userMessage, transactions, budget) => {
  const msg = userMessage.toLowerCase()
  
  // Calculate totals
  const totals = transactions.reduce((acc,t)=>{ 
    if(t.type==='income') acc.income += t.amount
    else acc.expense += t.amount
    return acc 
  }, {income:0, expense:0})
  
  const balance = totals.income - totals.expense
  const budgetUsage = budget > 0 ? (totals.expense / budget * 100).toFixed(1) : 0
  
  // Category breakdown
  const categoryData = transactions.reduce((acc,t)=>{ 
    if(t.type==='expense'){
      if(!acc[t.category]) acc[t.category]=0
      acc[t.category]+=t.amount
    }
    return acc 
  }, {})
  
  const topCategory = Object.keys(categoryData).reduce((a,b)=> categoryData[a] > categoryData[b] ? a : b, Object.keys(categoryData)[0])
  
  // Response patterns
  if(msg.includes('summary') || msg.includes('overview') || msg.includes('how am i doing')){
    return `📊 Here's your financial overview:\n\n💰 Total Income: $${totals.income.toFixed(2)}\n💸 Total Expenses: $${totals.expense.toFixed(2)}\n💵 Balance: $${balance.toFixed(2)}\n\n${balance >= 0 ? '✅ Great job! You have a positive balance.' : '⚠️ Your expenses exceed your income. Consider reviewing your spending.'}`
  }
  
  if(msg.includes('budget') || msg.includes('spending limit')){
    if(budget > 0){
      return `💰 Your monthly budget is $${budget.toFixed(2)}.\n\nYou've spent $${totals.expense.toFixed(2)} (${budgetUsage}% of budget).\n\n${budgetUsage > 100 ? '🚨 You\'re over budget! Consider cutting back on non-essential expenses.' : budgetUsage > 80 ? '⚠️ You\'re approaching your budget limit. Be mindful of upcoming expenses.' : '✅ You\'re doing great! Keep up the good spending habits.'}`
    } else {
      return `💡 You haven't set a monthly budget yet. I recommend setting one to help track your spending better! Go to Settings to add a budget.`
    }
  }
  
  if(msg.includes('save') || msg.includes('saving') || msg.includes('tips')){
    return `💡 Here are some money-saving tips:\n\n1. 🎯 Track every expense - you're already doing this!\n2. 📊 Review your spending weekly\n3. 🍽️ Reduce dining out if ${topCategory === 'Food' ? 'Food is your top expense' : 'possible'}\n4. 💰 Set aside 20% of income for savings\n5. 🛍️ Wait 24hrs before non-essential purchases\n6. 📱 Cancel unused subscriptions\n\nSmall changes add up over time! 🌟`
  }
  
  if(msg.includes('category') || msg.includes('spending') || msg.includes('most')){
    const categoryList = Object.entries(categoryData)
      .sort((a,b)=>b[1]-a[1])
      .slice(0, 3)
      .map((c,i)=>`${i+1}. ${c[0]}: $${c[1].toFixed(2)}`)
      .join('\n')
    
    return `📊 Your top spending categories:\n\n${categoryList}\n\n${topCategory ? `💡 ${topCategory} is your biggest expense. Consider if there are areas to optimize here.` : ''}`
  }
  
  if(msg.includes('income') || msg.includes('earn')){
    return `💰 Your total income is $${totals.income.toFixed(2)}.\n\n${totals.income > 0 ? '✅ Make sure to allocate your income wisely:\n• 50% for needs\n• 30% for wants\n• 20% for savings/debt' : '💡 Add your income sources to get better financial insights!'}`
  }
  
  if(msg.includes('help') || msg.includes('what can you do')){
    return `🤖 I'm your AI Financial Assistant! I can help you with:\n\n📊 Financial summaries\n💰 Budget tracking\n💡 Saving tips\n📈 Spending analysis\n🎯 Category insights\n💵 Income management\n\nJust ask me anything about your finances!`
  }
  
  // Default response
  return `🤖 I'm here to help with your finances! Try asking me:\n\n• "How am I doing?"\n• "What's my budget status?"\n• "Give me saving tips"\n• "Show my top categories"\n• "Help me save money"\n\nOr ask anything about your expenses! 💬`
}

export default function AIAssistant(){
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: '👋 Hi! I\'m your AI Financial Assistant. I can help you understand your spending, give budget advice, and provide money-saving tips. How can I help you today?',
      timestamp: new Date().toISOString()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  
  const transactions = getLocal('transactions', [])
  const budget = getLocal('budget', 0)
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  
  useEffect(scrollToBottom, [messages])
  
  const sendMessage = (e) => {
    e.preventDefault()
    if(!input.trim()) return
    
    // Add user message
    const userMsg = { role: 'user', content: input, timestamp: new Date().toISOString() }
    setMessages(m => [...m, userMsg])
    setInput('')
    setIsTyping(true)
    
    // Simulate AI thinking delay
    setTimeout(()=>{
      const aiResponse = generateAIResponse(input, transactions, budget)
      const aiMsg = { role: 'assistant', content: aiResponse, timestamp: new Date().toISOString() }
      setMessages(m => [...m, aiMsg])
      setIsTyping(false)
    }, 800)
  }
  
  const quickActions = [
    { label: '📊 Financial Summary', query: 'Show me my financial summary' },
    { label: '💰 Budget Status', query: 'What\'s my budget status?' },
    { label: '💡 Saving Tips', query: 'Give me money saving tips' },
    { label: '📈 Top Categories', query: 'What are my top spending categories?' },
  ]
  
  return (
    <div className="h-[calc(100vh-3rem)] flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-4xl">🤖</span>
        <div>
          <h2 className="text-2xl font-bold">AI Financial Assistant</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Get personalized insights and advice</p>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="mb-4 flex flex-wrap gap-2">
        {quickActions.map(action => (
          <button 
            key={action.label}
            onClick={()=>{ setInput(action.query); }}
            className="px-3 py-1.5 text-xs bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-all"
          >
            {action.label}
          </button>
        ))}
      </div>
      
      {/* Chat Messages */}
      <div className="flex-1 bg-white dark:bg-slate-800 rounded-lg shadow-card p-4 overflow-y-auto mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-lg ${
              msg.role === 'user' 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' 
                : 'bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200'
            }`}>
              <div className="whitespace-pre-wrap text-sm">{msg.content}</div>
              <div className={`text-xs mt-1 ${msg.role === 'user' ? 'text-indigo-100' : 'text-gray-500 dark:text-gray-400'}`}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-100 dark:bg-slate-700 p-3 rounded-lg">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Form */}
      <form onSubmit={sendMessage} className="flex gap-2">
        <input 
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask me anything about your finances..."
          className="flex-1 p-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          disabled={isTyping}
        />
        <button 
          type="submit"
          disabled={isTyping || !input.trim()}
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-lg">✉️</span>
        </button>
      </form>
    </div>
  )
}
