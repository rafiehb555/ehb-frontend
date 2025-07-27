export enum FranchiseType {
  SUB = 'sub',
  MASTER = 'master',
  CORPORATE = 'corporate'
}

export enum FranchiseStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  BANNED = 'banned'
}

export enum SQLLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  VIP = 'vip'
}

export interface Franchise {
  id: string
  name: string
  type: FranchiseType
  status: FranchiseStatus
  sqlLevel: SQLLevel
  territory: string
  address: string
  phone: string
  email: string
  walletAddress: string
  parentFranchiseId?: string
  subFranchises?: string[]
  createdAt: Date
  updatedAt: Date
  totalEarnings: number
  monthlyEarnings: number
  complaintResolutionRate: number
  averageResponseTime: number
}

export interface FranchiseRegistration {
  name: string
  type: FranchiseType
  territory: string
  address: string
  phone: string
  email: string
  walletAddress: string
  parentFranchiseId?: string
}

export interface FranchiseEarnings {
  franchiseId: string
  totalEarnings: number
  monthlyEarnings: number
  commissionRate: number
  lastPayout: Date
  pendingAmount: number
}

export interface Complaint {
  id: string
  title: string
  description: string
  status: 'open' | 'in_progress' | 'resolved' | 'escalated'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  franchiseId: string
  customerId: string
  createdAt: Date
  resolvedAt?: Date
  escalatedAt?: Date
  deadline: Date
  sqlImpact: number
}

export interface RevenueDistribution {
  orderId: string
  totalAmount: number
  sellerAmount: number
  subFranchiseAmount: number
  masterFranchiseAmount: number
  corporateFranchiseAmount: number
  deliveryAmount: number
  companyAmount: number
  distributedAt: Date
}

export interface FranchiseDashboard {
  franchise: Franchise
  earnings: FranchiseEarnings
  recentComplaints: Complaint[]
  performanceMetrics: {
    totalOrders: number
    totalRevenue: number
    complaintResolutionRate: number
    averageResponseTime: number
    sqlLevel: SQLLevel
  }
  territoryStats: {
    totalSubFranchises: number
    totalOrders: number
    totalRevenue: number
  }
}
