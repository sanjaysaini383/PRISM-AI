'use client'

import { motion } from 'framer-motion'

interface PRReviewTabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function PRReviewTabs({ activeTab, setActiveTab }: PRReviewTabsProps) {
  const tabs = [
    { id: 'summary', label: 'Summary', icon: '📝' },
    { id: 'security', label: 'Security', icon: '🛡️' },
    { id: 'performance', label: 'Performance', icon: '⚡' },
    { id: 'architecture', label: 'Architecture', icon: '🏗️' },
    { id: 'code', label: 'Code', icon: '💻' },
    { id: 'fixes', label: 'Suggested Fixes', icon: '🔧' },
  ]

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="glass rounded-xl p-2 flex gap-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-300 ${
              activeTab === tab.id
                ? 'glass bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-prism-accent'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="glass rounded-xl p-6"
      >
        {activeTab === 'summary' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">PR Summary</h3>
            <p className="text-gray-300">
              This pull request implements a comprehensive authentication system with support for JWT tokens,
              refresh tokens, and multi-factor authentication. The implementation follows OAuth 2.0 standards
              and includes rate limiting and security headers.
            </p>
            <div className="mt-6 pt-6 border-t border-white/10">
              <h4 className="font-semibold mb-3">Key Changes</h4>
              <ul className="space-y-2 text-gray-300">
                <li>✓ Added JWT token generation and validation</li>
                <li>✓ Implemented refresh token mechanism</li>
                <li>✓ Added MFA support with TOTP</li>
                <li>✓ Configured rate limiting and security headers</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">🛡️ Security Analysis</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10">
                <span>✓</span>
                <div>
                  <p className="font-semibold text-green-400">No SQL Injection Vulnerabilities Detected</p>
                  <p className="text-sm text-gray-300">All database queries are parameterized</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10">
                <span>✓</span>
                <div>
                  <p className="font-semibold text-green-400">Password Security Compliant</p>
                  <p className="text-sm text-gray-300">Uses bcrypt with proper salt rounds</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/10">
                <span>⚠️</span>
                <div>
                  <p className="font-semibold text-amber-400">Missing CSRF Protection</p>
                  <p className="text-sm text-gray-300">Consider adding CSRF tokens for state-changing operations</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">⚡ Performance Analysis</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10">
                <span>✓</span>
                <div>
                  <p className="font-semibold text-green-400">Efficient Database Queries</p>
                  <p className="text-sm text-gray-300">Uses indexes and proper query optimization</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/10">
                <span>⚠️</span>
                <div>
                  <p className="font-semibold text-amber-400">Token Generation Performance</p>
                  <p className="text-sm text-gray-300">Consider caching token templates for better performance</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">🏗️ Architecture Analysis</h3>
            <p className="text-gray-300 mb-4">Architecture follows best practices with clear separation of concerns:</p>
            <ul className="space-y-2 text-gray-300">
              <li>✓ Service layer for authentication logic</li>
              <li>✓ Middleware for request validation</li>
              <li>✓ Proper error handling and logging</li>
              <li>✓ Modular token management</li>
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  )
}
