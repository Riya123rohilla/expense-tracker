// Currency conversion utility using Exchange Rate API
const API_KEY = 'free-api-no-key-needed' // Using exchangerate-api.com free tier
const API_URL = 'https://api.exchangerate-api.com/v4/latest/'

export const CURRENCIES = {
  USD: { symbol: '$', name: 'US Dollar' },
  EUR: { symbol: '€', name: 'Euro' },
  GBP: { symbol: '£', name: 'British Pound' },
  INR: { symbol: '₹', name: 'Indian Rupee' },
  JPY: { symbol: '¥', name: 'Japanese Yen' },
  CNY: { symbol: '¥', name: 'Chinese Yuan' },
  AUD: { symbol: 'A$', name: 'Australian Dollar' },
  CAD: { symbol: 'C$', name: 'Canadian Dollar' },
  CHF: { symbol: 'Fr', name: 'Swiss Franc' },
  AED: { symbol: 'د.إ', name: 'UAE Dirham' },
}

// Cache for exchange rates (1 hour expiry)
let ratesCache = null
let cacheTime = null
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour

export const fetchExchangeRates = async (baseCurrency = 'USD') => {
  const now = Date.now()
  
  // Return cached rates if still valid
  if (ratesCache && cacheTime && (now - cacheTime) < CACHE_DURATION && ratesCache.base === baseCurrency) {
    return ratesCache
  }
  
  try {
    const response = await fetch(`${API_URL}${baseCurrency}`)
    if (!response.ok) throw new Error('Failed to fetch rates')
    
    const data = await response.json()
    ratesCache = data
    cacheTime = now
    
    return data
  } catch (error) {
    console.error('Currency API error:', error)
    // Return fallback rates if API fails
    return {
      base: baseCurrency,
      rates: {
        USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.12, JPY: 149.50,
        CNY: 7.24, AUD: 1.53, CAD: 1.36, CHF: 0.88, AED: 3.67
      }
    }
  }
}

export const convertCurrency = (amount, fromCurrency, toCurrency, rates) => {
  if (fromCurrency === toCurrency) return amount
  
  // Convert to base currency first, then to target
  const baseAmount = rates.base === fromCurrency ? amount : amount / rates.rates[fromCurrency]
  const convertedAmount = rates.base === toCurrency ? baseAmount : baseAmount * rates.rates[toCurrency]
  
  return convertedAmount
}

export const formatCurrency = (amount, currency = 'USD') => {
  const curr = CURRENCIES[currency] || CURRENCIES.USD
  return `${curr.symbol}${Math.abs(amount).toFixed(2)}`
}
