'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { FranchiseType } from '@/types/franchise'
import { franchiseService } from '@/services/franchiseService'
import toast from 'react-hot-toast'

interface RegisterFormData {
  name: string
  email: string
  password: string
  phone: string
  franchiseType: FranchiseType
  territory: string
  address: string
  walletAddress: string
  parentFranchiseId?: string
}

export default function FranchiseRegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>()

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    try {
      const response = await franchiseService.register(data)
      if (response.success) {
        toast.success('Franchise registered successfully!')
        router.push('/franchise/login')
      } else {
        toast.error(response.message || 'Registration failed')
      }
    } catch (error) {
      toast.error('An error occurred during registration')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register Your Franchise
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join the EHB Franchise ecosystem and start earning
          </p>
        </motion.div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Franchise Name
              </label>
              <input
                {...register('name', { required: 'Franchise name is required' })}
                type="text"
                className="input-field mt-1"
                placeholder="Enter franchise name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                type="email"
                className="input-field mt-1"
                placeholder="Enter email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters'
                  }
                })}
                type="password"
                className="input-field mt-1"
                placeholder="Enter password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                {...register('phone', { required: 'Phone number is required' })}
                type="tel"
                className="input-field mt-1"
                placeholder="Enter phone number"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="franchiseType" className="block text-sm font-medium text-gray-700">
                Franchise Type
              </label>
              <select
                {...register('franchiseType', { required: 'Franchise type is required' })}
                className="input-field mt-1"
              >
                <option value="">Select franchise type</option>
                <option value={FranchiseType.SUB}>Sub-Franchise (Tehsil/City)</option>
                <option value={FranchiseType.MASTER}>Master Franchise (District)</option>
                <option value={FranchiseType.CORPORATE}>Corporate Franchise (Country)</option>
              </select>
              {errors.franchiseType && (
                <p className="mt-1 text-sm text-red-600">{errors.franchiseType.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="territory" className="block text-sm font-medium text-gray-700">
                Territory
              </label>
              <input
                {...register('territory', { required: 'Territory is required' })}
                type="text"
                className="input-field mt-1"
                placeholder="Enter territory name"
              />
              {errors.territory && (
                <p className="mt-1 text-sm text-red-600">{errors.territory.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                {...register('address', { required: 'Address is required' })}
                rows={3}
                className="input-field mt-1"
                placeholder="Enter complete address"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="walletAddress" className="block text-sm font-medium text-gray-700">
                Wallet Address
              </label>
              <input
                {...register('walletAddress', { required: 'Wallet address is required' })}
                type="text"
                className="input-field mt-1"
                placeholder="Enter blockchain wallet address"
              />
              {errors.walletAddress && (
                <p className="mt-1 text-sm text-red-600">{errors.walletAddress.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full flex justify-center py-2 px-4"
              >
                {isLoading ? 'Registering...' : 'Register Franchise'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <a
                href="/franchise/login"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-600 bg-white hover:bg-gray-50"
              >
                Sign in to your account
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
