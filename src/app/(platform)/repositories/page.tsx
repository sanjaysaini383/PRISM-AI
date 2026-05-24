'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRepositories } from '@/lib/hooks'
import { AuthRequiredError } from '@/lib/api-client'

export default function RepositoriesPage() {
  const router = useRouter()
  const { data: repositories, isLoading, error } = useRepositories()

  if (error) {
    if (error instanceof AuthRequiredError) {
      router.push('/api/auth/github')
      return null
    }
    return (
      <ErrorBox
        message={error.message}
        onRetry={() => router.push('/api/auth/github')}
      />
    )
  }

  return (
    <div className="max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Repositories</h1>
        <p className="text-gray-500 text-sm mt-1">
          Select a repository to view and review pull requests
        </p>
      </div>

      {isLoading && <GridSkeleton />}

      {!isLoading && repositories && repositories.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repositories.map((repo) => {
            const [owner] = repo.full_name.split('/')
            return (
              <Link
                key={repo.id}
                href={`/pulls?owner=${owner}&repo=${repo.name}`}
                className="glass rounded-xl p-5 hover:border-purple-500/30 border border-transparent transition group"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold group-hover:text-purple-300 transition truncate">
                    {repo.name}
                  </h3>
                  {repo.language && (
                    <span className="text-xs shrink-0 px-2 py-0.5 rounded bg-purple-500/15 text-purple-300">
                      {repo.language}
                    </span>
                  )}
                </div>
                {repo.description && (
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">{repo.description}</p>
                )}
                <div className="flex gap-4 text-xs text-gray-500 font-mono">
                  <span>★ {repo.stargazers_count}</span>
                  <span>⑂ {repo.forks_count}</span>
                  <span>◎ {repo.open_issues_count}</span>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      {!isLoading && repositories?.length === 0 && (
        <div className="glass rounded-xl p-12 text-center text-gray-500">
          No repositories found on your GitHub account.
        </div>
      )}
    </div>
  )
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="glass rounded-xl h-32 animate-pulse" />
      ))}
    </div>
  )
}

function ErrorBox({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="glass rounded-xl p-6 border border-red-500/30">
      <p className="text-red-400">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 px-4 py-2 bg-red-600/80 hover:bg-red-600 rounded-lg text-sm"
      >
        Re-authenticate with GitHub
      </button>
    </div>
  )
}
