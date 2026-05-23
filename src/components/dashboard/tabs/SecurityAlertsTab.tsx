'use client'

import { motion } from 'framer-motion'

export function SecurityAlertsTab() {
  const alerts = [
    {
      id: 1,
      severity: 'critical',
      title: 'SQL Injection Vulnerability',
      description: 'Unsafe string concatenation in database query',
      file: 'src/db/queries.ts:45',
      pr: 'PR-1233',
      time: '2h ago'
    },
    {
      id: 2,
      severity: 'high',
      title: 'Hardcoded API Key',
      description: 'Sensitive credential exposed in source code',
      file: 'src/config.ts:12',
      pr: 'PR-1235',
      time: '5h ago'
    },
    {
      id: 3,
      severity: 'medium',
      title: 'Missing Input Validation',
      description: 'User input not validated before processing',
      file: 'src/handlers/user.ts:78',
      pr: 'PR-1234',
      time: '1d ago'
    },
  ]

  return (
    <div className="space-y-6">
      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="glass rounded-xl p-6 border-l-4 border-red-500">
          <p className="text-gray-400 text-sm mb-2">Critical Issues</p>
          <p className="text-3xl font-bold text-red-400">8</p>
        </div>
        <div className="glass rounded-xl p-6 border-l-4 border-amber-500">
          <p className="text-gray-400 text-sm mb-2">High Priority</p>
          <p className="text-3xl font-bold text-amber-400">15</p>
        </div>
        <div className="glass rounded-xl p-6 border-l-4 border-blue-500">
          <p className="text-gray-400 text-sm mb-2">Medium Issues</p>
          <p className="text-3xl font-bold text-blue-400">32</p>
        </div>
      </motion.div>

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass rounded-xl p-6 border-l-4"
            style={{
              borderLeftColor: alert.severity === 'critical' ? '#ef4444' : alert.severity === 'high' ? '#f59e0b' : '#3b82f6'
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold">{alert.title}</h3>
                <p className="text-gray-400 text-sm">{alert.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                alert.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                alert.severity === 'high' ? 'bg-amber-500/20 text-amber-400' :
                'bg-blue-500/20 text-blue-400'
              }`}>
                {alert.severity.toUpperCase()}
              </span>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <div>
                <span className="text-gray-500">Location: </span>
                <span className="font-mono text-prism-accent">{alert.file}</span>
              </div>
              <div>
                <span className="text-gray-500">PR: </span>
                <span className="font-semibold">{alert.pr}</span>
              </div>
              <div className="ml-auto">
                {alert.time}
              </div>
            </div>

            <button className="mt-4 px-4 py-2 rounded-lg bg-prism-accent/20 hover:bg-prism-accent/30 text-prism-accent text-sm font-semibold transition">
              View in PR
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
