'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  UserGroupIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  CogIcon,
  FlagIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'
import { FranchiseType, FranchiseStatus } from '@/types/franchise'

interface AdminPanelProps {
  franchiseId: string
}

export function AdminPanel({ franchiseId }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', name: 'Overview', icon: UserGroupIcon },
    { id: 'franchises', name: 'Franchises', icon: UserGroupIcon },
    { id: 'complaints', name: 'Complaints', icon: ExclamationTriangleIcon },
    { id: 'escalations', name: 'Escalations', icon: ClockIcon },
    { id: 'sql', name: 'SQL Management', icon: ShieldCheckIcon },
    { id: 'settings', name: 'Settings', icon: CogIcon }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Admin Panel
              </h1>
              <p className="text-gray-600">
                Franchise management and system administration
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                Admin Access
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.name}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'franchises' && <FranchisesTab />}
          {activeTab === 'complaints' && <ComplaintsTab />}
          {activeTab === 'escalations' && <EscalationsTab />}
          {activeTab === 'sql' && <SQLManagementTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </div>
      </div>
    </div>
  )
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserGroupIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Franchises</p>
              <p className="text-2xl font-semibold text-gray-900">1,234</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Complaints</p>
              <p className="text-2xl font-semibold text-gray-900">56</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ClockIcon className="h-8 w-8 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Escalated</p>
              <p className="text-2xl font-semibold text-gray-900">12</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ShieldCheckIcon className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">SQL Violations</p>
              <p className="text-2xl font-semibold text-gray-900">3</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <UserGroupIcon className="w-5 h-5 text-blue-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">New Sub-Franchise Registered</p>
                <p className="text-xs text-gray-500">ABC Store - 2 hours ago</p>
              </div>
            </div>
            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
              Approved
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="w-5 h-5 text-orange-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Complaint Escalated</p>
                <p className="text-xs text-gray-500">XYZ Restaurant - 1 hour ago</p>
              </div>
            </div>
            <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
              Escalated
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <ShieldCheckIcon className="w-5 h-5 text-purple-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">SQL Level Updated</p>
                <p className="text-xs text-gray-500">DEF Franchise - 30 minutes ago</p>
              </div>
            </div>
            <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
              Upgraded
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function FranchisesTab() {
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">Franchise Management</h3>
        <button className="btn-primary">Add New Franchise</button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Franchise
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SQL Level
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">ABC Store</div>
                  <div className="text-sm text-gray-500">abc@example.com</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="franchise-badge franchise-badge-sub">Sub</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                  Medium
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-primary-600 hover:text-primary-900 mr-3">Edit</button>
                <button className="text-red-600 hover:text-red-900">Suspend</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

function ComplaintsTab() {
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-medium text-gray-900 mb-4">Complaint Management</h3>
      <p className="text-gray-600">Manage and track all complaints across the system.</p>
    </motion.div>
  )
}

function EscalationsTab() {
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-medium text-gray-900 mb-4">Escalation Chain</h3>
      <p className="text-gray-600">View escalation chain with timestamps and resolution tracking.</p>
    </motion.div>
  )
}

function SQLManagementTab() {
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-medium text-gray-900 mb-4">SQL Policy Management</h3>
      <p className="text-gray-600">Manage SQL level policies, penalties, and rewards.</p>
    </motion.div>
  )
}

function SettingsTab() {
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-medium text-gray-900 mb-4">System Settings</h3>
      <p className="text-gray-600">Configure system settings and access controls.</p>
    </motion.div>
  )
}
