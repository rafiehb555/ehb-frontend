'use client'

import { motion } from 'framer-motion'
import {
  UsersIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

const stats = [
  {
    icon: UsersIcon,
    value: '500+',
    label: 'Active Franchises',
    description: 'Operating across multiple territories'
  },
  {
    icon: CurrencyDollarIcon,
    value: '$2.5M+',
    label: 'Total Revenue Distributed',
    description: 'Commission shared with franchise network'
  },
  {
    icon: GlobeAltIcon,
    value: '25+',
    label: 'Countries Covered',
    description: 'Global franchise network expansion'
  },
  {
    icon: ShieldCheckIcon,
    value: '98%',
    label: 'Complaint Resolution Rate',
    description: 'Average resolution within 6 hours'
  }
]

export function StatsSection() {
  return (
    <section className="py-20 bg-primary-600 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            EHB Franchise Network Stats
          </h2>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Our growing network of franchises is transforming local business operations worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-medium mb-2">
                {stat.label}
              </div>
              <div className="text-sm text-primary-100">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
