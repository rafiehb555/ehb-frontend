'use client'

import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { motion } from 'framer-motion'
import {
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  UserGroupIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'
import { franchiseService } from '@/services/franchiseService'
import { FranchiseDashboard } from '@/types/franchise'

export default function DashboardPage() {
  const [franchiseId, setFranchiseId] = useState<string>('')

  useEffect(() => {
    // Get franchise ID from localStorage or context
    const storedFranchiseId = localStorage.getItem('franchiseId')
    if (storedFranchiseId) {
      setFranchiseId(storedFranchiseId)
    }
  }, [])

  const { data: dashboardData, isLoading, error } = useQuery(
    ['dashboard', franchiseId],
    () => franchiseService.getDashboard(franchiseId),
    {
      enabled: !!franchiseId,
      refetchInterval: 30000, // Refetch every 30 seconds
    }
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto" />
          <p className="mt-4 text-gray-600">Error loading dashboard</p>
        </div>
      </div>
    )
  }

  const data = dashboardData?.data as FranchiseDashboard

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Franchise Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back, {data?.franchise?.name}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`franchise-badge franchise-badge-${data?.franchise?.type}`}>
                {data?.franchise?.type} Franchise
              </span>
              <span className="text-sm text-gray-500">
                SQL Level: {data?.franchise?.sqlLevel}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Earnings</p>
                <p className="text-2xl font-semibold text-gray-900">
                  ${data?.earnings?.totalEarnings?.toFixed(2) || '0.00'}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ChartBarIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Monthly Earnings</p>
                <p className="text-2xl font-semibold text-gray-900">
                  ${data?.earnings?.monthlyEarnings?.toFixed(2) || '0.00'}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Resolution Rate</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {data?.franchise?.complaintResolutionRate || 0}%
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ClockIcon className="h-8 w-8 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Avg Response Time</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {data?.franchise?.averageResponseTime || 0}h
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Complaints */}
        <motion.div
          className="card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Recent Complaints
          </h3>
          <div className="space-y-4">
            {data?.recentComplaints?.map((complaint) => (
              <div key={complaint.id} className="border-l-4 border-orange-500 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {complaint.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {complaint.description}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    complaint.status === 'resolved'
                      ? 'bg-green-100 text-green-800'
                      : complaint.status === 'in_progress'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {complaint.status}
                  </span>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Created: {new Date(complaint.createdAt).toLocaleDateString()}
                  {complaint.deadline && (
                    <span className="ml-4">
                      Deadline: {new Date(complaint.deadline).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            ))}
            {(!data?.recentComplaints || data.recentComplaints.length === 0) && (
              <p className="text-gray-500 text-center py-4">
                No recent complaints
              </p>
            )}
          </div>
        </motion.div>

        {/* Territory Stats */}
        {data?.territoryStats && (
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Territory Statistics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <UserGroupIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-semibold text-gray-900">
                  {data.territoryStats.totalSubFranchises}
                </p>
                <p className="text-sm text-gray-600">Sub-Franchises</p>
              </div>
              <div className="text-center">
                <ChartBarIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-semibold text-gray-900">
                  {data.territoryStats.totalOrders}
                </p>
                <p className="text-sm text-gray-600">Total Orders</p>
              </div>
              <div className="text-center">
                <CurrencyDollarIcon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-semibold text-gray-900">
                  ${data.territoryStats.totalRevenue?.toFixed(2) || '0.00'}
                </p>
                <p className="text-sm text-gray-600">Total Revenue</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
