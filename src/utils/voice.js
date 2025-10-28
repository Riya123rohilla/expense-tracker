// Voice recognition utility for expense input
export const isVoiceSupported = () => {
  return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
}

export const startVoiceRecognition = (onResult, onError) => {
  if (!isVoiceSupported()) {
    onError?.('Voice recognition not supported in this browser')
    return null
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = new SpeechRecognition()
  
  recognition.continuous = false
  recognition.interimResults = false
  recognition.lang = 'en-US'

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript
    const parsed = parseVoiceCommand(transcript)
    onResult?.(parsed, transcript)
  }

  recognition.onerror = (event) => {
    onError?.(event.error)
  }

  recognition.start()
  return recognition
}

// Parse voice command like "Add expense 300 rupees for dinner" or "Add ₹500 for groceries"
export const parseVoiceCommand = (transcript) => {
  const text = transcript.toLowerCase()
  
  const result = {
    amount: null,
    category: null,
    title: null,
    type: 'expense',
    raw: transcript
  }

  // Detect type (income or expense)
  if (text.includes('income') || text.includes('earning') || text.includes('salary')) {
    result.type = 'income'
  }

  // Extract amount - look for numbers with optional currency
  const amountPatterns = [
    /(\d+\.?\d*)\s*(rupees?|dollars?|euros?|pounds?|₹|\$|€|£)/i,
    /₹\s*(\d+\.?\d*)/,
    /\$\s*(\d+\.?\d*)/,
    /(\d+\.?\d*)\s*(?=for|in|to|under)/i,
    /(\d+\.?\d*)/
  ]

  for (const pattern of amountPatterns) {
    const match = text.match(pattern)
    if (match) {
      result.amount = parseFloat(match[1] || match[0])
      break
    }
  }

  // Extract category keywords
  const categories = ['food', 'transport', 'shopping', 'bills', 'salary', 'groceries', 'dining', 'rent', 'entertainment']
  for (const cat of categories) {
    if (text.includes(cat)) {
      result.category = cat.charAt(0).toUpperCase() + cat.slice(1)
      break
    }
  }

  // Extract title - text after "for" or between amount and end
  const forMatch = text.match(/for\s+(.+)$/i)
  const toMatch = text.match(/to\s+(.+)$/i)
  const onMatch = text.match(/on\s+(.+)$/i)
  
  if (forMatch) {
    result.title = forMatch[1].trim()
  } else if (toMatch) {
    result.title = toMatch[1].trim()
  } else if (onMatch) {
    result.title = onMatch[1].trim()
  } else {
    // Use remaining text after removing amount
    const cleaned = text.replace(/add|expense|income|rupees?|dollars?|\d+\.?\d*/gi, '').trim()
    if (cleaned) result.title = cleaned
  }

  // Capitalize title
  if (result.title) {
    result.title = result.title.charAt(0).toUpperCase() + result.title.slice(1)
  }

  return result
}
