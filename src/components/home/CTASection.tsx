'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export function CTASection() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Join the EHB Franchise Network?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Start your journey as a franchise partner and unlock unlimited earning potential
              with our decentralized ecosystem. Join thousands of successful franchises worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/franchise/register"
                className="btn-primary text-lg px-8 py-3 inline-flex items-center"
              >
                Register Your Franchise
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/dashboard"
                className="btn-secondary text-lg px-8 py-3"
              >
                View Dashboard Demo
              </Link>
            </div>

            <div className="mt-8 text-sm text-gray-400">
              <p>Already have an account?
                <Link href="/franchise/login" className="text-primary-400 hover:text-primary-300 ml-1">
                  Sign in here
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
