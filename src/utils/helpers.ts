import { format, formatDistance, parseISO } from 'date-fns'

// Date formatting helpers
export const formatDate = (date: string | Date, formatString = 'MMM dd, yyyy'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, formatString)
}

export const formatDateTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, 'MMM dd, yyyy HH:mm')
}

export const formatRelativeTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return formatDistance(dateObj, new Date(), { addSuffix: true })
}

// Currency formatting
export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export const formatPercentage = (value: number): string => {
  return `${(value * 100).toFixed(2)}%`
}

// String helpers
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const truncate = (str: string, length: number): string => {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Array helpers
export const chunk = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

export const unique = <T>(array: T[]): T[] => {
  return [...new Set(array)]
}

export const groupBy = <T, K extends keyof any>(array: T[], key: (item: T) => K): Record<K, T[]> => {
  return array.reduce((groups, item) => {
    const group = key(item)
    groups[group] = groups[group] || []
    groups[group].push(item)
    return groups
  }, {} as Record<K, T[]>)
}

// Object helpers
export const pick = <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  const result = {} as Pick<T, K>
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key]
    }
  })
  return result
}

export const omit = <T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const result = { ...obj }
  keys.forEach(key => {
    delete result[key]
  })
  return result
}

// Validation helpers
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export const isValidWalletAddress = (address: string): boolean => {
  const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/
  return ethAddressRegex.test(address)
}

// Number helpers
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max)
}

export const round = (value: number, decimals = 2): number => {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
}

export const random = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Color helpers
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

export const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')
}

// URL helpers
export const getQueryParam = (url: string, param: string): string | null => {
  const urlParams = new URLSearchParams(url.split('?')[1])
  return urlParams.get(param)
}

export const setQueryParam = (url: string, param: string, value: string): string => {
  const urlObj = new URL(url)
  urlObj.searchParams.set(param, value)
  return urlObj.toString()
}

// Storage helpers
export const getStorageItem = <T>(key: string, defaultValue?: T): T | null => {
  if (typeof window === 'undefined') return defaultValue || null

  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue || null
  } catch {
    return defaultValue || null
  }
}

export const setStorageItem = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Error setting storage item:', error)
  }
}

export const removeStorageItem = (key: string): void => {
  if (typeof window === 'undefined') return

  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error('Error removing storage item:', error)
  }
}

// Debounce helper
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle helper
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Copy to clipboard helper
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    const result = document.execCommand('copy')
    document.body.removeChild(textArea)
    return result
  }
}

// Download file helper
export const downloadFile = (url: string, filename?: string): void => {
  const link = document.createElement('a')
  link.href = url
  link.download = filename || 'download'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Generate ID helper
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9)
}

// Deep clone helper
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as T
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as T
  if (typeof obj === 'object') {
    const clonedObj = {} as T
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }
  return obj
}
