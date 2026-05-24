'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { usePullRequests } from '@/lib/hooks'
import { AuthRequiredError } from '@/lib/api-client'

export default function PullsPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const owner = searchParams.get('owner') || ''
  const repo = searchParams.get('repo') || ''
  const [statusFilter, setStatusFilter] = useState<'open' | 'closed' | 'all'>('open')

  useEffect(() => {
    if (!owner || !repo) {
      router.replace('/repositories')
    }
  }, [owner, repo, router])

  const { data: pullRequests, isLoading, error } = usePullRequests(
    owner,
    repo,
    statusFilter
  )

  if (!owner || !repo) return null

  if (error instanceof AuthRequiredError) {
    router.push('/api/auth/github')
    return null
  }

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Link href="/repositories" className="hover:text-purple-400">
            Repositories
          </Link>
          <span>/</span>
          <span className="text-white font-mono">
            {owner}/{repo}
          </span>
        </div>
        <h1 className="text-2xl font-bold">Pull requests</h1>
      </div>

      <div className="flex gap-2">
        {(['open', 'closed', 'all'] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setStatusFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              statusFilter === f
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                : 'text-gray-400 hover:bg-white/5'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="glass rounded-xl h-20 animate-pulse" />
          ))}
        </div>
      )}

      {error && (
        <div className="glass rounded-xl p-4 border border-red-500/30 text-red-400 text-sm">
          {(error as Error).message}
        </div>
      )}

      {!isLoading && !error && (
        <div className="space-y-2">
          {pullRequests && pullRequests.length > 0 ? (
            pullRequests.map((pr) => (
              <Link
                key={pr.id}
                href={`/pulls/${pr.number}?owner=${owner}&repo=${repo}`}
                className="block glass rounded-xl p-4 hover:border-purple-500/20 border border-transparent transition group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-medium group-hover:text-purple-300 transition truncate">
                      {pr.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      #{pr.number} · @{pr.author} · {formatRelative(pr.updatedAt)}
                    </p>
                  </div>
                  <StatusBadge status={pr.status} />
                </div>
                <div className="flex gap-4 mt-3 text-xs font-mono text-gray-500">
                  <span>{pr.filesChanged} files</span>
                  <span className="text-green-500/80">+{pr.additions}</span>
                  <span className="text-red-500/80">-{pr.deletions}</span>
                </div>
              </Link>
            ))
          ) : (
            <div className="glass rounded-xl p-12 text-center text-gray-500">
              No {statusFilter === 'all' ? '' : statusFilter} pull requests found.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === 'open'
      ? 'bg-green-500/15 text-green-400'
      : status === 'merged'
        ? 'bg-purple-500/15 text-purple-400'
        : 'bg-gray-500/15 text-gray-400'
  return (
    <span className={`shrink-0 px-2 py-0.5 rounded text-xs font-medium ${styles}`}>
      {status}
    </span>
  )
}

function formatRelative(dateString: string) {
  const diff = Date.now() - new Date(dateString).getTime()
  const hours = Math.floor(diff / 3600000)
  if (hours < 1) return 'just now'
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}
