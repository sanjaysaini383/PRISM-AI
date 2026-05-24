'use client'

import Link from 'next/link'
import { Navigation } from '../Navigation'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-prism-bg">
      <Navigation />

      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-24">
        <p className="text-sm font-mono text-purple-400 mb-4">AI PR Review Platform</p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          Automated code review for{' '}
          <span className="gradient-text">GitHub pull requests</span>
        </h1>
        <p className="text-lg text-gray-400 mb-10 max-w-2xl">
          Connect your GitHub account, select a repository, and run multi-phase AI analysis
          on real diffs — security, performance, architecture, and merge confidence scoring.
        </p>

        <div className="flex flex-wrap gap-4 mb-16">
          <Link
            href="/api/auth/github"
            className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-500 font-semibold transition"
          >
            Sign in with GitHub
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-lg border border-white/15 hover:bg-white/5 transition"
          >
            Open dashboard
          </Link>
        </div>

        <section className="glass rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase">How it works</h2>
          <ol className="space-y-3 text-sm text-gray-400">
            <li>
              <span className="text-purple-400 font-mono mr-2">1.</span>
              OAuth connects your GitHub account and repositories
            </li>
            <li>
              <span className="text-purple-400 font-mono mr-2">2.</span>
              Select a PR — diffs are fetched via GitHub API
            </li>
            <li>
              <span className="text-purple-400 font-mono mr-2">3.</span>
              AI review streams findings in real time (SSE)
            </li>
            <li>
              <span className="text-purple-400 font-mono mr-2">4.</span>
              Inline annotations, scores, and fix suggestions in the diff viewer
            </li>
          </ol>
        </section>

        <section className="mt-8 grid sm:grid-cols-3 gap-4 text-sm">
          {[
            { title: 'GitHub OAuth', desc: 'Real repos, PRs, and user profile' },
            { title: 'OpenAI analysis', desc: 'Multi-phase review pipeline' },
            { title: 'GitHub Action', desc: 'Optional CI integration' },
          ].map((item) => (
            <div key={item.title} className="glass rounded-lg p-4">
              <p className="font-semibold text-white mb-1">{item.title}</p>
              <p className="text-gray-500">{item.desc}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}
