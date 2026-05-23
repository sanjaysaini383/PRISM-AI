'use client'

export function CodeDiff() {
  return (
    <div className="glass rounded-xl overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h3 className="font-semibold">src/auth/middleware.ts</h3>
        <span className="text-sm text-prism-accent">+45 -12</span>
      </div>

      <div className="font-mono text-sm max-h-96 overflow-y-auto">
        {/* Added lines */}
        <div className="bg-green-500/5 px-4 py-2 text-green-300">
          + import { createJWT, verifyToken } from './jwt'
        </div>
        <div className="bg-green-500/5 px-4 py-2 text-green-300">
          + import { hash, compare } from 'bcrypt'
        </div>

        {/* Context lines */}
        <div className="px-4 py-2 text-gray-400">
          &nbsp; export async function authMiddleware(req, res, next) {'{'}
        </div>
        <div className="px-4 py-2 text-gray-400">
          &nbsp;&nbsp;&nbsp;&nbsp;const token = req.headers.authorization?.split(' ')[1]
        </div>

        {/* Changed lines */}
        <div className="bg-red-500/5 px-4 py-2 text-red-300">
          - &nbsp;&nbsp;&nbsp;&nbsp;if (!token) return res.status(401).json({'{'}error: 'Unauthorized'{'}')
        </div>
        <div className="bg-green-500/5 px-4 py-2 text-green-300">
          + &nbsp;&nbsp;&nbsp;&nbsp;if (!token) {'{'}
        </div>
        <div className="bg-green-500/5 px-4 py-2 text-green-300">
          + &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return res.status(401).json({'{'}error: 'Unauthorized'{'}')
        </div>
        <div className="bg-green-500/5 px-4 py-2 text-green-300">
          + &nbsp;&nbsp;&nbsp;&nbsp;{'}'}
        </div>

        {/* More context */}
        <div className="px-4 py-2 text-gray-400">
          &nbsp;&nbsp;&nbsp;&nbsp;try {'{'}
        </div>
        <div className="px-4 py-2 text-gray-400">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const decoded = await verifyToken(token)
        </div>
        <div className="px-4 py-2 text-gray-400">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;req.user = decoded
        </div>
        <div className="px-4 py-2 text-gray-400">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;next()
        </div>
        <div className="px-4 py-2 text-gray-400">
          &nbsp;&nbsp;&nbsp;&nbsp;{'}'} catch (error) {'{'}
        </div>
        <div className="bg-green-500/5 px-4 py-2 text-green-300">
          + &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.error('Token verification failed:', error)
        </div>
        <div className="px-4 py-2 text-gray-400">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;res.status(401).json({'{'}error: 'Invalid token'{'}')
        </div>
        <div className="px-4 py-2 text-gray-400">
          &nbsp;&nbsp;&nbsp;&nbsp;{'}'}
        </div>
        <div className="px-4 py-2 text-gray-400">
          &nbsp;{'}'}
        </div>
      </div>

      {/* Issues */}
      <div className="border-t border-white/10 p-4 space-y-3">
        <h4 className="font-semibold text-sm">Inline Issues</h4>
        <div className="flex items-start gap-2 p-3 rounded bg-amber-500/10">
          <span className="text-amber-400">⚠️</span>
          <div className="text-sm">
            <p className="font-semibold">Line 7: Missing error context</p>
            <p className="text-gray-400">Consider logging the error for debugging</p>
          </div>
        </div>
      </div>
    </div>
  )
}
