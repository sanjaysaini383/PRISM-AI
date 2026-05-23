'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { TopBar } from '@/components/dashboard/TopBar'
import { OverviewTab } from '@/components/dashboard/tabs/OverviewTab'
import { PullRequestsTab } from '@/components/dashboard/tabs/PullRequestsTab'
import { SecurityAlertsTab } from '@/components/dashboard/tabs/SecurityAlertsTab'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-prism-bg">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      {/* Layout */}
      <div className="relative z-10 flex">
        {/* Sidebar */}
        <Sidebar open={sidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          
          {/* Content Area */}
          <div className="flex-1 overflow-auto p-4 md:p-8">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'overview' && <OverviewTab />}
              {activeTab === 'pull-requests' && <PullRequestsTab />}
              {activeTab === 'security' && <SecurityAlertsTab />}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
