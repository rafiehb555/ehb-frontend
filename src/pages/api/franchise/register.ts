import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { connectDB } from '@/utils/database'
import { FranchiseModel } from '@/models/Franchise'
import { ApiResponse } from '@/types/api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  try {
    await connectDB()

    const {
      name,
      email,
      password,
      phone,
      franchiseType,
      territory,
      address,
      walletAddress,
      parentFranchiseId
    } = req.body

    // Validate required fields
    if (!name || !email || !password || !phone || !franchiseType || !territory || !address || !walletAddress) {
      return res.status(400).json({
        success: false,
        error: 'All required fields must be provided'
      })
    }

    // Check if franchise already exists
    const existingFranchise = await FranchiseModel.findOne({ email })
    if (existingFranchise) {
      return res.status(400).json({
        success: false,
        error: 'Franchise with this email already exists'
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create new franchise
    const franchise = new FranchiseModel({
      name,
      email,
      password: hashedPassword,
      phone,
      type: franchiseType,
      territory,
      address,
      walletAddress,
      parentFranchiseId,
      status: 'pending',
      sqlLevel: 'low',
      totalEarnings: 0,
      monthlyEarnings: 0,
      complaintResolutionRate: 0,
      averageResponseTime: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    await franchise.save()

    // Generate JWT token
    const token = jwt.sign(
      { franchiseId: franchise._id, email: franchise.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    // Remove password from response
    const franchiseResponse = franchise.toObject()
    delete franchiseResponse.password

    res.status(201).json({
      success: true,
      data: {
        franchise: franchiseResponse,
        token
      },
      message: 'Franchise registered successfully'
    })

  } catch (error) {
    console.error('Franchise registration error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
}
