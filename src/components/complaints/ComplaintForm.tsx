'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import {
  ExclamationTriangleIcon,
  ClockIcon,
  UserIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'
import { complaintService } from '@/services/complaintService'
import toast from 'react-hot-toast'

interface ComplaintFormData {
  title: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  customerId: string
  franchiseId: string
}

interface ComplaintFormProps {
  franchiseId: string
  onSuccess?: () => void
}

export function ComplaintForm({ franchiseId, onSuccess }: ComplaintFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ComplaintFormData>()

  const onSubmit = async (data: ComplaintFormData) => {
    setIsLoading(true)
    try {
      const response = await complaintService.createComplaint({
        ...data,
        franchiseId,
        deadline: new Date(Date.now() + 6 * 60 * 60 * 1000) // 6 hours from now
      })

      if (response.success) {
        toast.success('Complaint created successfully!')
        reset()
        onSuccess?.()
      } else {
        toast.error(response.message || 'Failed to create complaint')
      }
    } catch (error) {
      toast.error('An error occurred while creating complaint')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-6">
        <ExclamationTriangleIcon className="w-6 h-6 text-orange-500 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">Create New Complaint</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Complaint Title
          </label>
          <input
            type="text"
            id="title"
            {...register('title', { required: 'Title is required' })}
            className="input-field"
            placeholder="Enter complaint title"
          />
          {errors.title && (
            <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            {...register('description', { required: 'Description is required' })}
            className="input-field"
            placeholder="Provide detailed description of the complaint"
          />
          {errors.description && (
            <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
            Priority Level
          </label>
          <select
            id="priority"
            {...register('priority', { required: 'Priority is required' })}
            className="input-field"
          >
            <option value="">Select priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
          {errors.priority && (
            <p className="text-red-600 text-sm mt-1">{errors.priority.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="customerId" className="block text-sm font-medium text-gray-700 mb-2">
            Customer ID
          </label>
          <input
            type="text"
            id="customerId"
            {...register('customerId', { required: 'Customer ID is required' })}
            className="input-field"
            placeholder="Enter customer ID"
          />
          {errors.customerId && (
            <p className="text-red-600 text-sm mt-1">{errors.customerId.message}</p>
          )}
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center">
            <ClockIcon className="w-5 h-5 text-orange-500 mr-2" />
            <span className="text-sm font-medium text-orange-800">
              Complaint Deadline: 6 hours
            </span>
          </div>
          <p className="text-xs text-orange-600 mt-1">
            This complaint must be resolved within 6 hours to avoid SQL penalties
          </p>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => reset()}
            className="btn-secondary"
            disabled={isLoading}
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary"
          >
            {isLoading ? 'Creating...' : 'Create Complaint'}
          </button>
        </div>
      </form>
    </motion.div>
  )
}
