'use client'

import Link from 'next/link'
import { useDashboardStats, useRepositories } from '@/lib/hooks'

export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats()
  const { data: repos, isLoading: reposLoading } = useRepositories()

  const recentRepos = repos?.slice(0, 6) ?? []

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Review activity from your connected GitHub account
        </p>
      </div>

      {/* Stats from real reviews */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Reviews completed"
          value={statsLoading ? '—' : String(stats?.totalReviews ?? 0)}
          sub="This session"
        />
        <StatCard
          label="Total findings"
          value={statsLoading ? '—' : String(stats?.totalFindings ?? 0)}
          sub="Across all reviews"
        />
        <StatCard
          label="Avg merge confidence"
          value={
            statsLoading
              ? '—'
              : stats?.avgMergeConfidence != null
                ? `${stats.avgMergeConfidence}%`
                : 'N/A'
          }
          sub="From completed reviews"
        />
        <StatCard
          label="Critical issues"
          value={
            statsLoading ? '—' : String(stats?.severityCount?.critical ?? 0)
          }
          sub="Requires attention"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent review activity */}
        <section className="lg:col-span-2 glass rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-4">Recent reviews</h2>
          {statsLoading ? (
            <LoadingSkeleton rows={3} />
          ) : stats?.recentReviews && stats.recentReviews.length > 0 ? (
            <ul className="space-y-2">
              {stats.recentReviews.map((r) => (
                <li key={r.id}>
                  <Link
                    href={`/pulls/${r.prNumber}?owner=${r.owner}&repo=${r.repo}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition group"
                  >
                    <div>
                      <p className="font-medium group-hover:text-purple-300 transition">
                        {r.owner}/{r.repo} #{r.prNumber}
                      </p>
                      <p className="text-xs text-gray-500">
                        {r.findingsCount} findings ·{' '}
                        {new Date(r.updatedAt).toLocaleString()}
                      </p>
                    </div>
                    {r.mergeConfidence != null && (
                      <span className="text-sm font-mono text-purple-400">
                        {r.mergeConfidence}%
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState message="No reviews yet. Open a pull request and run an AI review." />
          )}
        </section>

        {/* Findings breakdown */}
        <section className="glass rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-4">Findings by category</h2>
          {statsLoading ? (
            <LoadingSkeleton rows={4} />
          ) : stats && stats.totalFindings > 0 ? (
            <ul className="space-y-3 text-sm">
              {Object.entries(stats.categoryCount).map(([cat, count]) => (
                <li key={cat} className="flex justify-between">
                  <span className="capitalize text-gray-400">{cat}</span>
                  <span className="font-mono">{count}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">Run a review to see breakdown</p>
          )}
        </section>
      </div>

      {/* Repositories quick access */}
      <section className="glass rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Your repositories</h2>
          <Link href="/repositories" className="text-sm text-purple-400 hover:text-purple-300">
            View all →
          </Link>
        </div>
        {reposLoading ? (
          <LoadingSkeleton rows={2} />
        ) : recentRepos.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {recentRepos.map((repo) => {
              const [owner] = repo.full_name.split('/')
              return (
                <Link
                  key={repo.id}
                  href={`/pulls?owner=${owner}&repo=${repo.name}`}
                  className="p-4 rounded-lg border border-white/5 hover:border-purple-500/30 hover:bg-white/[0.03] transition"
                >
                  <p className="font-medium truncate">{repo.name}</p>
                  <p className="text-xs text-gray-500 mt-1 truncate">
                    {repo.description || 'No description'}
                  </p>
                  <div className="flex gap-3 mt-2 text-xs text-gray-500">
                    {repo.language && <span>{repo.language}</span>}
                    <span>★ {repo.stargazers_count}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <EmptyState message="Connect GitHub to see your repositories." />
        )}
      </section>
    </div>
  )
}

function StatCard({
  label,
  value,
  sub,
}: {
  label: string
  value: string
  sub: string
}) {
  return (
    <div className="glass rounded-xl p-4">
      <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-bold mt-1 font-mono">{value}</p>
      <p className="text-xs text-gray-600 mt-1">{sub}</p>
    </div>
  )
}

function LoadingSkeleton({ rows }: { rows: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-12 rounded-lg bg-white/5 animate-pulse" />
      ))}
    </div>
  )
}

function EmptyState({ message }: { message: string }) {
  return <p className="text-sm text-gray-500 py-6 text-center">{message}</p>
}
