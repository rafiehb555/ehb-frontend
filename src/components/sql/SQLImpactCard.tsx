'use client'

import { motion } from 'framer-motion'
import {
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import { SQLLevel } from '@/types/franchise'

interface SQLImpactCardProps {
  currentLevel: SQLLevel
  score: number
  impact: number
  penalties: number
  rewards: number
  lastUpdated: Date
}

export function SQLImpactCard({
  currentLevel,
  score,
  impact,
  penalties,
  rewards,
  lastUpdated
}: SQLImpactCardProps) {
  const getLevelColor = (level: SQLLevel) => {
    switch (level) {
      case SQLLevel.LOW:
        return 'text-red-600 bg-red-100'
      case SQLLevel.MEDIUM:
        return 'text-yellow-600 bg-yellow-100'
      case SQLLevel.HIGH:
        return 'text-green-600 bg-green-100'
      case SQLLevel.VIP:
        return 'text-purple-600 bg-purple-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getLevelIcon = (level: SQLLevel) => {
    switch (level) {
      case SQLLevel.LOW:
        return <ExclamationTriangleIcon className="w-5 h-5" />
      case SQLLevel.MEDIUM:
        return <ClockIcon className="w-5 h-5" />
      case SQLLevel.HIGH:
        return <CheckCircleIcon className="w-5 h-5" />
      case SQLLevel.VIP:
        return <ShieldCheckIcon className="w-5 h-5" />
      default:
        return <ShieldCheckIcon className="w-5 h-5" />
    }
  }

  const getProgressColor = (score: number) => {
    if (score >= 90) return 'bg-purple-500'
    if (score >= 70) return 'bg-green-500'
    if (score >= 50) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <ShieldCheckIcon className="w-6 h-6 text-indigo-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">SQL Impact Rating</h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(currentLevel)}`}>
          {currentLevel.toUpperCase()}
        </span>
      </div>

      <div className="space-y-6">
        {/* Current Score */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Current Score</span>
            <span className="text-sm font-bold text-gray-900">{score}/100</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${getProgressColor(score)}`}
              style={{ width: `${score}%` }}
            ></div>
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{penalties}</div>
            <div className="text-sm text-gray-600">Penalties</div>
          </div>

          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{rewards}</div>
            <div className="text-sm text-gray-600">Rewards</div>
          </div>
        </div>

        {/* Impact Level */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Impact Level</h4>
          <div className="flex items-center space-x-2">
            {getLevelIcon(currentLevel)}
            <span className="text-sm text-gray-900">
              {impact > 0 ? `+${impact}` : impact} points this month
            </span>
          </div>
        </div>

        {/* Level Breakdown */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Level Breakdown</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">VIP (90-100)</span>
              <span className="text-xs text-gray-900">{score >= 90 ? '✓' : '○'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">High (70-89)</span>
              <span className="text-xs text-gray-900">{score >= 70 && score < 90 ? '✓' : '○'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Medium (30-69)</span>
              <span className="text-xs text-gray-900">{score >= 30 && score < 70 ? '✓' : '○'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Low (0-29)</span>
              <span className="text-xs text-gray-900">{score < 30 ? '✓' : '○'}</span>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Last updated: {lastUpdated.toLocaleDateString()} at {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
