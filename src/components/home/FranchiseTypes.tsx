'use client'

import { motion } from 'framer-motion'
import {
  BuildingOfficeIcon,
  GlobeAltIcon,
  CrownIcon
} from '@heroicons/react/24/outline'

const franchiseTypes = [
  {
    icon: BuildingOfficeIcon,
    title: 'Sub-Franchise',
    description: 'Operates at tehsil or small city level',
    features: [
      'Local delivery verification',
      'Product/service complaint resolution within 6 hours',
      'Registers local service providers',
      'Initial KYC and SQL service management'
    ],
    commission: '1-2%',
    color: 'blue'
  },
  {
    icon: GlobeAltIcon,
    title: 'Master Franchise',
    description: 'Operates at district level (manages 10–25 Sub-Franchises)',
    features: [
      'Handle escalated complaints',
      'Validate Sub-Franchise performance',
      'Reports to Corporate Franchise',
      'Franchise tracking UI'
    ],
    commission: '0.5-1%',
    color: 'purple'
  },
  {
    icon: CrownIcon,
    title: 'Corporate Franchise',
    description: 'Country-level franchise management',
    features: [
      'National reporting and territory enforcement',
      'Manages SQL policy application',
      'Approves/Revokes master franchises',
      'Advanced audit dashboard'
    ],
    commission: '0.5%',
    color: 'green'
  }
]

export function FranchiseTypes() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Franchise Types
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the franchise type that best fits your business goals and territory requirements
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {franchiseTypes.map((type, index) => (
            <motion.div
              key={index}
              className="card hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-6">
                <div className={`w-16 h-16 bg-${type.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <type.icon className={`w-8 h-8 text-${type.color}-600`} />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {type.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {type.description}
                </p>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Commission: {type.commission}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Key Features:</h4>
                <ul className="space-y-2">
                  {type.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className={`w-2 h-2 bg-${type.color}-500 rounded-full mt-2 mr-3 flex-shrink-0`}></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
