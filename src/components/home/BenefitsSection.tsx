'use client'

import { motion } from 'framer-motion'
import {
  CurrencyDollarIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

const benefits = [
  {
    icon: CurrencyDollarIcon,
    title: 'Revenue Sharing',
    description: 'Earn commissions from every transaction in your territory with transparent blockchain tracking.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'SQL Trust System',
    description: 'Build trust through service quality with automatic SQL upgrades and penalty systems.'
  },
  {
    icon: GlobeAltIcon,
    title: 'Territory Management',
    description: 'Manage your designated area with full control over local operations and service delivery.'
  },
  {
    icon: ChartBarIcon,
    title: 'Performance Analytics',
    description: 'Track your performance with detailed analytics and real-time dashboard insights.'
  }
]

export function BenefitsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose EHB Franchise?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our decentralized ecosystem and benefit from transparent governance,
            reward-based performance, and global scalability with local accountability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="card text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
