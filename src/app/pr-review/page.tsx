'use client'

import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { PRReviewHeader } from '@/components/pr-review/PRReviewHeader'
import { PRReviewTabs } from '@/components/pr-review/PRReviewTabs'
import { CodeDiff } from '@/components/pr-review/CodeDiff'
import { AIAnalysisPanel } from '@/components/pr-review/AIAnalysisPanel'
import { MergeConfidence } from '@/components/pr-review/MergeConfidence'

export default function PRReview() {
  const [activeTab, setActiveTab] = useState('summary')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  return (
    <div className="min-h-screen bg-prism-bg">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <PRReviewHeader />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Code & Tabs */}
            <div className="lg:col-span-2">
              <PRReviewTabs activeTab={activeTab} setActiveTab={setActiveTab} />
              
              {activeTab === 'code' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6"
                >
                  <CodeDiff />
                </motion.div>
              )}
            </div>

            {/* Right: Sidebar */}
            <div className="space-y-6">
              {/* Merge Confidence */}
              <MergeConfidence score={87} />

              {/* AI Analysis */}
              <AIAnalysisPanel isAnalyzing={isAnalyzing} setIsAnalyzing={setIsAnalyzing} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
