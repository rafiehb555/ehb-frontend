'use client'

import { motion } from 'framer-motion'
import {
  BuildingOfficeIcon,
  GlobeAltIcon,
  CrownIcon,
  CheckCircleIcon,
  ClockIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'
import { FranchiseType } from '@/types/franchise'

interface FranchiseTypeCardProps {
  type: FranchiseType
  title: string
  description: string
  duties: string[]
  commission: string
  requirements: string[]
  icon: React.ComponentType<any>
  color: string
}

export function FranchiseTypeCard({
  type,
  title,
  description,
  duties,
  commission,
  requirements,
  icon: Icon,
  color
}: FranchiseTypeCardProps) {
  return (
    <motion.div
      className="card hover:shadow-lg transition-all duration-300 border-l-4"
      style={{ borderLeftColor: color }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex items-start space-x-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center`} style={{ backgroundColor: `${color}20` }}>
          <Icon className="w-6 h-6" style={{ color }} />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <span className="px-3 py-1 text-sm font-medium rounded-full" style={{ backgroundColor: `${color}20`, color }}>
              {commission} Commission
            </span>
          </div>

          <p className="text-gray-600 mb-4">{description}</p>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                <CheckCircleIcon className="w-4 h-4 mr-2" style={{ color }} />
                Key Duties
              </h4>
              <ul className="space-y-1">
                {duties.map((duty, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 mr-2 flex-shrink-0" style={{ backgroundColor: color }}></div>
                    {duty}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                <UserGroupIcon className="w-4 h-4 mr-2" style={{ color }} />
                Requirements
              </h4>
              <ul className="space-y-1">
                {requirements.map((requirement, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 mr-2 flex-shrink-0" style={{ backgroundColor: color }}></div>
                    {requirement}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Franchise Type:</span>
              <span className="font-medium text-gray-900 capitalize">{type}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
