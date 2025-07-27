'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            EHB Franchise System
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-8 text-primary-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Decentralized franchise ecosystem with revenue sharing,
            complaint management, and blockchain integration
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              href="/franchise/register"
              className="btn-primary text-lg px-8 py-3"
            >
              Register Franchise
            </Link>
            <Link
              href="/dashboard"
              className="btn-secondary text-lg px-8 py-3"
            >
              View Dashboard
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-y-6"></div>
      </div>
    </section>
  )
}
