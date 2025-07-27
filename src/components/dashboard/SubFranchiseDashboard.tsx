'use client'

import { motion } from 'framer-motion'
import {
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  UserGroupIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline'
import { FranchiseDashboard } from '@/types/franchise'
import { formatCurrency, formatRelativeTime } from '@/utils/helpers'

interface SubFranchiseDashboardProps {
  data: FranchiseDashboard
}

export function SubFranchiseDashboard({ data }: SubFranchiseDashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Sub-Franchise Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back, {data?.franchise?.name}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="franchise-badge franchise-badge-sub">
                Sub Franchise
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
                  {formatCurrency(data?.earnings?.totalEarnings || 0)}
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
                  {formatCurrency(data?.earnings?.monthlyEarnings || 0)}
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

        {/* Local Complaints Section */}
        <motion.div
          className="card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <ExclamationTriangleIcon className="w-5 h-5 mr-2 text-orange-500" />
              Local Complaints
            </h3>
            <span className="text-sm text-gray-500">
              {data?.recentComplaints?.length || 0} complaints
            </span>
          </div>

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
                  Created: {formatRelativeTime(complaint.createdAt)}
                  {complaint.deadline && (
                    <span className="ml-4">
                      Deadline: {formatRelativeTime(complaint.deadline)}
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

        {/* User Approvals Section */}
        <motion.div
          className="card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <UserGroupIcon className="w-5 h-5 mr-2 text-blue-500" />
              User Approvals
            </h3>
            <span className="text-sm text-gray-500">
              Pending approvals
            </span>
          </div>

          <div className="space-y-4">
            {/* Mock user approvals - replace with real data */}
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    New Service Provider Registration
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Local shop "ABC Store" requesting registration
                  </p>
                </div>
                <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                  Pending
                </span>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Requested: 2 hours ago
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    KYC Verification
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    "XYZ Restaurant" KYC documents submitted
                  </p>
                </div>
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                  Approved
                </span>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Approved: 1 hour ago
              </div>
            </div>
          </div>
        </motion.div>

        {/* SQL Service Management */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <ShieldCheckIcon className="w-5 h-5 mr-2 text-purple-500" />
              SQL Service Management
            </h3>
            <span className="text-sm text-gray-500">
              Current Level: {data?.franchise?.sqlLevel}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {data?.performanceMetrics?.totalOrders || 0}
              </div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {data?.performanceMetrics?.complaintResolutionRate || 0}%
              </div>
              <div className="text-sm text-gray-600">Resolution Rate</div>
            </div>

            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {data?.performanceMetrics?.averageResponseTime || 0}h
              </div>
              <div className="text-sm text-gray-600">Avg Response</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
