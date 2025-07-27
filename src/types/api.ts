export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: {
    id: string
    email: string
    role: string
    franchiseId?: string
  }
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  phone: string
  franchiseType: string
  territory: string
  address: string
  walletAddress: string
}

export interface ComplaintRequest {
  title: string
  description: string
  priority: string
  customerId: string
  franchiseId: string
}

export interface EscalationRequest {
  complaintId: string
  reason: string
  escalatedTo: string
}

export interface RevenueDistributionRequest {
  orderId: string
  totalAmount: number
  franchiseId: string
}

export interface SQLUpdateRequest {
  franchiseId: string
  newLevel: string
  reason: string
  verificationRequired: boolean
}
