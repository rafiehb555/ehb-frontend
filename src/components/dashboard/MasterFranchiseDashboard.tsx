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
  GlobeAltIcon,
  ArrowUpIcon,
  DocumentChartBarIcon
} from '@heroicons/react/24/outline'
import { FranchiseDashboard } from '@/types/franchise'
import { formatCurrency, formatRelativeTime } from '@/utils/helpers'

interface MasterFranchiseDashboardProps {
  data: FranchiseDashboard
}

export function MasterFranchiseDashboard({ data }: MasterFranchiseDashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Master Franchise Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back, {data?.franchise?.name}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="franchise-badge franchise-badge-master">
                Master Franchise
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
                <UserGroupIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Sub-Franchises</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {data?.territoryStats?.totalSubFranchises || 0}
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
                <ExclamationTriangleIcon className="h-8 w-8 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Escalated Complaints</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {data?.recentComplaints?.filter(c => c.status === 'escalated').length || 0}
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
                <ChartBarIcon className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatCurrency(data?.territoryStats?.totalRevenue || 0)}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Escalated Complaints Section */}
        <motion.div
          className="card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <ArrowUpIcon className="w-5 h-5 mr-2 text-red-500" />
              Escalated Complaints
            </h3>
            <span className="text-sm text-gray-500">
              {data?.recentComplaints?.filter(c => c.status === 'escalated').length || 0} escalated
            </span>
          </div>

          <div className="space-y-4">
            {data?.recentComplaints?.filter(c => c.status === 'escalated').map((complaint) => (
              <div key={complaint.id} className="border-l-4 border-red-500 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {complaint.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {complaint.description}
                    </p>
                    <p className="text-xs text-red-600 mt-1">
                      Escalated from Sub-Franchise
                    </p>
                  </div>
                  <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                    Escalated
                  </span>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Escalated: {formatRelativeTime(complaint.escalatedAt || complaint.createdAt)}
                  {complaint.deadline && (
                    <span className="ml-4">
                      Deadline: {formatRelativeTime(complaint.deadline)}
                    </span>
                  )}
                </div>
              </div>
            ))}
            {(!data?.recentComplaints?.filter(c => c.status === 'escalated') ||
              data.recentComplaints.filter(c => c.status === 'escalated').length === 0) && (
              <p className="text-gray-500 text-center py-4">
                No escalated complaints
              </p>
            )}
          </div>
        </motion.div>

        {/* Sub-Franchise Performance */}
        <motion.div
          className="card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <UserGroupIcon className="w-5 h-5 mr-2 text-blue-500" />
              Sub-Franchise Performance
            </h3>
            <span className="text-sm text-gray-500">
              {data?.territoryStats?.totalSubFranchises || 0} sub-franchises
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {data?.territoryStats?.totalOrders || 0}
              </div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {data?.territoryStats?.totalRevenue ? formatCurrency(data.territoryStats.totalRevenue) : '$0'}
              </div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </div>

            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {data?.performanceMetrics?.complaintResolutionRate || 0}%
              </div>
              <div className="text-sm text-gray-600">Avg Resolution Rate</div>
            </div>
          </div>
        </motion.div>

        {/* Report Generation */}
        <motion.div
          className="card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <DocumentChartBarIcon className="w-5 h-5 mr-2 text-indigo-500" />
              Report Generation
            </h3>
            <span className="text-sm text-gray-500">
              Generate reports
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
              <h4 className="font-medium text-gray-900 mb-2">Performance Report</h4>
              <p className="text-sm text-gray-600 mb-3">
                Generate comprehensive performance report for all sub-franchises
              </p>
              <button className="btn-primary text-sm">
                Generate Report
              </button>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
              <h4 className="font-medium text-gray-900 mb-2">Revenue Report</h4>
              <p className="text-sm text-gray-600 mb-3">
                Generate revenue and commission distribution report
              </p>
              <button className="btn-primary text-sm">
                Generate Report
              </button>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
              <h4 className="font-medium text-gray-900 mb-2">Complaint Report</h4>
              <p className="text-sm text-gray-600 mb-3">
                Generate complaint resolution and escalation report
              </p>
              <button className="btn-primary text-sm">
                Generate Report
              </button>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
              <h4 className="font-medium text-gray-900 mb-2">SQL Impact Report</h4>
              <p className="text-sm text-gray-600 mb-3">
                Generate SQL level impact and penalty report
              </p>
              <button className="btn-primary text-sm">
                Generate Report
              </button>
            </div>
          </div>
        </motion.div>

        {/* Training Stats */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <ShieldCheckIcon className="w-5 h-5 mr-2 text-green-500" />
              Training Statistics
            </h3>
            <span className="text-sm text-gray-500">
              Training metrics
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">85%</div>
              <div className="text-sm text-gray-600">Completion Rate</div>
            </div>

            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-gray-600">Active Trainings</div>
            </div>

            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">4.2</div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </div>

            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">24</div>
              <div className="text-sm text-gray-600">Certified Staff</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
