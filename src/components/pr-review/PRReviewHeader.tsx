'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function PRReviewHeader() {
  return (
    <motion.div
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass border-b border-white/10 px-4 md:px-8 py-6"
    >
      <div className="max-w-7xl mx-auto">
        <Link href="/dashboard" className="text-sm text-prism-accent hover:text-prism-accent/80 mb-4 inline-block">
          ← Back to Dashboard
        </Link>
        
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Add authentication system</h1>
            <div className="flex items-center gap-4 text-gray-400">
              <span>PR-1234</span>
              <span>•</span>
              <span>alex-dev</span>
              <span>•</span>
              <span className="text-prism-accent font-semibold">Open</span>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-gray-400 text-sm">main-app</p>
            <p className="text-gray-400 text-sm">Created 2 hours ago</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
