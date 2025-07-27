import mongoose, { Schema, Document } from 'mongoose'

export interface IComplaint extends Document {
  title: string
  description: string
  status: 'open' | 'in_progress' | 'resolved' | 'escalated'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  franchiseId: mongoose.Types.ObjectId
  customerId: string
  createdAt: Date
  resolvedAt?: Date
  escalatedAt?: Date
  deadline: Date
  sqlImpact: number
  resolution?: string
  escalatedTo?: mongoose.Types.ObjectId
  comments?: Array<{
    text: string
    author: string
    createdAt: Date
  }>
}

const ComplaintSchema = new Schema<IComplaint>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['open', 'in_progress', 'resolved', 'escalated'],
    default: 'open'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  franchiseId: {
    type: Schema.Types.ObjectId,
    ref: 'Franchise',
    required: true
  },
  customerId: {
    type: String,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  },
  sqlImpact: {
    type: Number,
    default: 0
  },
  resolution: {
    type: String,
    trim: true
  },
  escalatedTo: {
    type: Schema.Types.ObjectId,
    ref: 'Franchise'
  },
  comments: [{
    text: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
})

// Indexes
ComplaintSchema.index({ franchiseId: 1 })
ComplaintSchema.index({ status: 1 })
ComplaintSchema.index({ priority: 1 })
ComplaintSchema.index({ createdAt: 1 })
ComplaintSchema.index({ deadline: 1 })

// Virtual for time remaining
ComplaintSchema.virtual('timeRemaining').get(function() {
  const now = new Date()
  const deadline = new Date(this.deadline)
  return Math.max(0, deadline.getTime() - now.getTime())
})

ComplaintSchema.virtual('isOverdue').get(function() {
  return this.timeRemaining <= 0 && this.status !== 'resolved'
})

// Methods
ComplaintSchema.methods.resolve = async function(resolution: string) {
  this.status = 'resolved'
  this.resolution = resolution
  this.resolvedAt = new Date()
  await this.save()
}

ComplaintSchema.methods.escalate = async function(escalatedTo: mongoose.Types.ObjectId) {
  this.status = 'escalated'
  this.escalatedTo = escalatedTo
  this.escalatedAt = new Date()
  await this.save()
}

ComplaintSchema.methods.addComment = async function(text: string, author: string) {
  this.comments.push({ text, author, createdAt: new Date() })
  await this.save()
}

// Static methods
ComplaintSchema.statics.findByFranchise = function(franchiseId: mongoose.Types.ObjectId) {
  return this.find({ franchiseId })
}

ComplaintSchema.statics.findOverdue = function() {
  const now = new Date()
  return this.find({
    deadline: { $lt: now },
    status: { $ne: 'resolved' }
  })
}

ComplaintSchema.statics.findByStatus = function(status: string) {
  return this.find({ status })
}

ComplaintSchema.statics.findByPriority = function(priority: string) {
  return this.find({ priority })
}

export const ComplaintModel = mongoose.models.Complaint || mongoose.model<IComplaint>('Complaint', ComplaintSchema)
