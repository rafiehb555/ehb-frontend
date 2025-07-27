import { FranchiseType, SQLLevel } from '@/types/franchise'

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  return emailRegex.test(email)
}

// Phone validation
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

// Wallet address validation
export const isValidWalletAddress = (address: string): boolean => {
  const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/
  return ethAddressRegex.test(address)
}

// Password validation
export const isValidPassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Franchise type validation
export const isValidFranchiseType = (type: string): boolean => {
  return Object.values(FranchiseType).includes(type as FranchiseType)
}

// SQL level validation
export const isValidSQLLevel = (level: string): boolean => {
  return Object.values(SQLLevel).includes(level as SQLLevel)
}

// Territory validation
export const isValidTerritory = (territory: string): boolean => {
  return territory.length >= 3 && territory.length <= 100
}

// Amount validation
export const isValidAmount = (amount: number): boolean => {
  return amount > 0 && amount <= 1000000
}

// Commission rate validation
export const isValidCommissionRate = (rate: number): boolean => {
  return rate >= 0 && rate <= 100
}

// Complaint priority validation
export const isValidPriority = (priority: string): boolean => {
  const validPriorities = ['low', 'medium', 'high', 'urgent']
  return validPriorities.includes(priority)
}

// Complaint status validation
export const isValidStatus = (status: string): boolean => {
  const validStatuses = ['open', 'in_progress', 'resolved', 'escalated']
  return validStatuses.includes(status)
}

// Date validation
export const isValidDate = (date: string): boolean => {
  const dateObj = new Date(date)
  return dateObj instanceof Date && !isNaN(dateObj.getTime())
}

// Future date validation
export const isFutureDate = (date: string): boolean => {
  const dateObj = new Date(date)
  const now = new Date()
  return dateObj > now
}

// Required field validation
export const isRequired = (value: any): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0
  }
  return value !== null && value !== undefined
}

// Min length validation
export const hasMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength
}

// Max length validation
export const hasMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength
}

// URL validation
export const isValidURL = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Form validation helper
export const validateForm = (data: Record<string, any>, rules: Record<string, any>): Record<string, string[]> => {
  const errors: Record<string, string[]> = {}

  Object.keys(rules).forEach(field => {
    const value = data[field]
    const fieldRules = rules[field]
    const fieldErrors: string[] = []

    // Required validation
    if (fieldRules.required && !isRequired(value)) {
      fieldErrors.push(`${field} is required`)
    }

    // Email validation
    if (fieldRules.email && value && !isValidEmail(value)) {
      fieldErrors.push('Invalid email format')
    }

    // Phone validation
    if (fieldRules.phone && value && !isValidPhone(value)) {
      fieldErrors.push('Invalid phone number')
    }

    // Wallet address validation
    if (fieldRules.wallet && value && !isValidWalletAddress(value)) {
      fieldErrors.push('Invalid wallet address')
    }

    // Min length validation
    if (fieldRules.minLength && value && !hasMinLength(value, fieldRules.minLength)) {
      fieldErrors.push(`Minimum length is ${fieldRules.minLength} characters`)
    }

    // Max length validation
    if (fieldRules.maxLength && value && !hasMaxLength(value, fieldRules.maxLength)) {
      fieldErrors.push(`Maximum length is ${fieldRules.maxLength} characters`)
    }

    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors
    }
  })

  return errors
}
