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
  ChartBarIcon,
  ShieldCheckIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'
import { franchiseService } from '@/services/franchiseService'
import { FranchiseDashboard as FranchiseDashboardType, FranchiseType } from '@/types/franchise'
import { SubFranchiseDashboard } from './SubFranchiseDashboard'
import { MasterFranchiseDashboard } from './MasterFranchiseDashboard'
import { CorporateFranchiseDashboard } from './CorporateFranchiseDashboard'

interface FranchiseDashboardProps {
  franchiseId: string
}

export function FranchiseDashboard({ franchiseId }: FranchiseDashboardProps) {
  const [franchiseType, setFranchiseType] = useState<FranchiseType | null>(null)

  const { data: dashboardData, isLoading, error } = useQuery(
    ['dashboard', franchiseId],
    () => franchiseService.getDashboard(franchiseId),
    {
      enabled: !!franchiseId,
      refetchInterval: 30000, // Refetch every 30 seconds
    }
  )

  useEffect(() => {
    if (dashboardData?.data?.franchise?.type) {
      setFranchiseType(dashboardData.data.franchise.type)
    }
  }, [dashboardData])

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

  const data = dashboardData?.data as FranchiseDashboardType

  // Render different dashboard based on franchise type
  switch (franchiseType) {
    case FranchiseType.SUB:
      return <SubFranchiseDashboard data={data} />
    case FranchiseType.MASTER:
      return <MasterFranchiseDashboard data={data} />
    case FranchiseType.CORPORATE:
      return <CorporateFranchiseDashboard data={data} />
    default:
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <ExclamationTriangleIcon className="h-12 w-12 text-yellow-500 mx-auto" />
            <p className="mt-4 text-gray-600">Franchise type not determined</p>
          </div>
        </div>
      )
  }
}
