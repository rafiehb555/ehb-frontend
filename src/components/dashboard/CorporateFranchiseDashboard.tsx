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
  CrownIcon,
  CogIcon,
  FlagIcon
} from '@heroicons/react/24/outline'
import { FranchiseDashboard } from '@/types/franchise'
import { formatCurrency, formatRelativeTime } from '@/utils/helpers'

interface CorporateFranchiseDashboardProps {
  data: FranchiseDashboard
}

export function CorporateFranchiseDashboard({ data }: CorporateFranchiseDashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Corporate Franchise Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back, {data?.franchise?.name}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="franchise-badge franchise-badge-corporate">
                Corporate Franchise
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
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
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
                <p className="text-sm font-medium text-gray-500">Master Franchises</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {data?.territoryStats?.totalMasterFranchises || 0}
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
                <GlobeAltIcon className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Countries</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {data?.territoryStats?.totalCountries || 0}
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
                <ShieldCheckIcon className="h-8 w-8 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Validators</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {data?.territoryStats?.totalValidators || 0}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Global Performance Metrics */}
        <motion.div
          className="card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <ChartBarIcon className="w-5 h-5 mr-2 text-blue-500" />
              Global Performance Metrics
            </h3>
            <span className="text-sm text-gray-500">
              Country-wide statistics
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">
                {data?.territoryStats?.totalOrders || 0}
              </div>
              <div className="text-sm text-gray-600 mt-2">Total Orders</div>
              <div className="text-xs text-green-600 mt-1">+12% from last month</div>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">
                {data?.territoryStats?.totalRevenue ? formatCurrency(data.territoryStats.totalRevenue) : '$0'}
              </div>
              <div className="text-sm text-gray-600 mt-2">Total Revenue</div>
              <div className="text-xs text-green-600 mt-1">+8% from last month</div>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">
                {data?.performanceMetrics?.complaintResolutionRate || 0}%
              </div>
              <div className="text-sm text-gray-600 mt-2">Resolution Rate</div>
              <div className="text-xs text-green-600 mt-1">+5% from last month</div>
            </div>
          </div>
        </motion.div>

        {/* Advanced Audit Dashboard */}
        <motion.div
          className="card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <CogIcon className="w-5 h-5 mr-2 text-indigo-500" />
              Advanced Audit Dashboard
            </h3>
            <span className="text-sm text-gray-500">
              System monitoring
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">System Health</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Database Status</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                    Healthy
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">API Response Time</span>
                  <span className="text-sm text-gray-900">120ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Blockchain Sync</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                    Synced
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Users</span>
                  <span className="text-sm text-gray-900">1,234</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Security Alerts</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Failed Login Attempts</span>
                  <span className="text-sm text-gray-900">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Suspicious Activities</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                    2 Detected
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">SQL Violations</span>
                  <span className="text-sm text-gray-900">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Blockchain Transactions</span>
                  <span className="text-sm text-gray-900">456</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Territory Enforcement */}
        <motion.div
          className="card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <FlagIcon className="w-5 h-5 mr-2 text-red-500" />
              Territory Enforcement
            </h3>
            <span className="text-sm text-gray-500">
              Policy management
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">SQL Policy</h4>
              <p className="text-sm text-gray-600 mb-3">
                Manage SQL level policies and penalties
              </p>
              <button className="btn-primary text-sm">
                Manage Policy
              </button>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Territory Assignment</h4>
              <p className="text-sm text-gray-600 mb-3">
                Assign and manage franchise territories
              </p>
              <button className="btn-primary text-sm">
                Manage Territories
              </button>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Franchise Approval</h4>
              <p className="text-sm text-gray-600 mb-3">
                Approve or revoke master franchises
              </p>
              <button className="btn-primary text-sm">
                Manage Approvals
              </button>
            </div>
          </div>
        </motion.div>

        {/* Validator Options */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <ShieldCheckIcon className="w-5 h-5 mr-2 text-green-500" />
              Validator Options
            </h3>
            <span className="text-sm text-gray-500">
              Blockchain integration
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Validator Requirements</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Minimum SQL Level</span>
                  <span className="text-sm text-gray-900">High/VIP</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Minimum Stake</span>
                  <span className="text-sm text-gray-900">1,000 EHBGC</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Franchise Type</span>
                  <span className="text-sm text-gray-900">Master/Corporate</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Performance Score</span>
                  <span className="text-sm text-gray-900">85%+</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Validator Benefits</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm text-gray-600">Earn staking rewards</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm text-gray-600">Governance voting rights</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm text-gray-600">Network security</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm text-gray-600">Priority support</span>
                </div>
              </div>

              <button className="btn-primary w-full mt-4">
                Apply for Validator
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
