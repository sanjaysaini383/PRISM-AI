'use client'

import Link from 'next/link'
import { useUser } from '@/lib/hooks'

export default function SettingsPage() {
  const { data: user, isLoading } = useUser()

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Account and integration settings</p>
      </div>

      <section className="glass rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-400 uppercase">GitHub account</h2>
        {isLoading ? (
          <div className="h-16 bg-white/5 rounded animate-pulse" />
        ) : user ? (
          <div className="flex items-center gap-4">
            <img
              src={user.avatar_url}
              alt=""
              className="w-14 h-14 rounded-full border border-white/10"
            />
            <div>
              <p className="font-semibold">{user.name || user.login}</p>
              <p className="text-sm text-gray-500">@{user.login}</p>
              {user.email && <p className="text-sm text-gray-500">{user.email}</p>}
              {user.public_repos != null && (
                <p className="text-xs text-gray-600 mt-1">
                  {user.public_repos} public repositories
                </p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-sm">Not signed in</p>
        )}

        <div className="flex gap-3 pt-2">
          <Link
            href="/api/auth/github"
            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-sm transition"
          >
            {user ? 'Reconnect GitHub' : 'Connect GitHub'}
          </Link>
          {user && (
            <Link
              href="/api/auth/logout"
              className="px-4 py-2 rounded-lg border border-white/10 text-sm hover:bg-white/5 transition"
            >
              Sign out
            </Link>
          )}
        </div>
      </section>

      <section className="glass rounded-xl p-6 space-y-3">
        <h2 className="text-sm font-semibold text-gray-400 uppercase">Environment</h2>
        <p className="text-sm text-gray-500">
          AI reviews require <code className="text-purple-300">OPENAI_API_KEY</code> on the
          server. GitHub OAuth requires{' '}
          <code className="text-purple-300">NEXT_PUBLIC_GITHUB_CLIENT_ID</code> and{' '}
          <code className="text-purple-300">GITHUB_CLIENT_SECRET</code>.
        </p>
        <p className="text-sm text-gray-500">
          For CI-based reviews, configure the GitHub Action in{' '}
          <code className="text-purple-300">.github/workflows/codefox-review.yml</code> (PRISM AI Action).
        </p>
      </section>
    </div>
  )
}
