import mongoose, { Schema, Document } from 'mongoose'
import { FranchiseType, FranchiseStatus, SQLLevel } from '@/types/franchise'

export interface IFranchise extends Document {
  name: string
  email: string
  password: string
  phone: string
  type: FranchiseType
  status: FranchiseStatus
  sqlLevel: SQLLevel
  territory: string
  address: string
  walletAddress: string
  parentFranchiseId?: mongoose.Types.ObjectId
  subFranchises?: mongoose.Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
  totalEarnings: number
  monthlyEarnings: number
  complaintResolutionRate: number
  averageResponseTime: number
}

const FranchiseSchema = new Schema<IFranchise>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: Object.values(FranchiseType),
    required: true
  },
  status: {
    type: String,
    enum: Object.values(FranchiseStatus),
    default: FranchiseStatus.PENDING
  },
  sqlLevel: {
    type: String,
    enum: Object.values(SQLLevel),
    default: SQLLevel.LOW
  },
  territory: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  walletAddress: {
    type: String,
    required: true,
    trim: true
  },
  parentFranchiseId: {
    type: Schema.Types.ObjectId,
    ref: 'Franchise'
  },
  subFranchises: [{
    type: Schema.Types.ObjectId,
    ref: 'Franchise'
  }],
  totalEarnings: {
    type: Number,
    default: 0
  },
  monthlyEarnings: {
    type: Number,
    default: 0
  },
  complaintResolutionRate: {
    type: Number,
    default: 0
  },
  averageResponseTime: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

// Indexes
FranchiseSchema.index({ email: 1 })
FranchiseSchema.index({ type: 1 })
FranchiseSchema.index({ status: 1 })
FranchiseSchema.index({ territory: 1 })
FranchiseSchema.index({ parentFranchiseId: 1 })

// Virtual for franchise hierarchy
FranchiseSchema.virtual('isSubFranchise').get(function() {
  return this.type === FranchiseType.SUB
})

FranchiseSchema.virtual('isMasterFranchise').get(function() {
  return this.type === FranchiseType.MASTER
})

FranchiseSchema.virtual('isCorporateFranchise').get(function() {
  return this.type === FranchiseType.CORPORATE
})

// Methods
FranchiseSchema.methods.updateEarnings = async function(amount: number) {
  this.totalEarnings += amount
  this.monthlyEarnings += amount
  await this.save()
}

FranchiseSchema.methods.updatePerformance = async function(resolutionRate: number, responseTime: number) {
  this.complaintResolutionRate = resolutionRate
  this.averageResponseTime = responseTime
  await this.save()
}

// Static methods
FranchiseSchema.statics.findByTerritory = function(territory: string) {
  return this.find({ territory })
}

FranchiseSchema.statics.findByType = function(type: FranchiseType) {
  return this.find({ type })
}

FranchiseSchema.statics.findActive = function() {
  return this.find({ status: FranchiseStatus.ACTIVE })
}

export const FranchiseModel = mongoose.models.Franchise || mongoose.model<IFranchise>('Franchise', FranchiseSchema)
