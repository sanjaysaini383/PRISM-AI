'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import clsx from 'clsx'
import { useUser } from '@/lib/hooks'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '◫' },
  { href: '/repositories', label: 'Repositories', icon: '⎇' },
  { href: '/settings', label: 'Settings', icon: '⚙' },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { data: user, isLoading } = useUser()

  return (
    <div className="min-h-screen bg-prism-bg flex">
      {/* Sidebar */}
      <aside
        className={clsx(
          'border-r border-white/10 bg-prism-bg-secondary/50 flex flex-col transition-all duration-300',
          sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
        )}
      >
        <div className="p-5 border-b border-white/10">
          <Link href="/dashboard" className="block">
            <span className="text-xl font-bold gradient-text">CodingFox</span>
            <p className="text-xs text-gray-500 mt-0.5">AI PR Review</p>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition',
                  active
                    ? 'bg-purple-500/15 text-purple-300 border border-purple-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                )}
              >
                <span className="text-base opacity-70">{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          {isLoading ? (
            <div className="animate-pulse flex gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-white/10 rounded w-20" />
                <div className="h-2 bg-white/10 rounded w-16" />
              </div>
            </div>
          ) : user ? (
            <div className="flex items-center gap-3">
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-9 h-9 rounded-full border border-white/10"
              />
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{user.name || user.login}</p>
                <p className="text-xs text-gray-500 truncate">@{user.login}</p>
              </div>
            </div>
          ) : (
            <Link
              href="/api/auth/github"
              className="block text-center text-sm py-2 rounded-lg bg-purple-600 hover:bg-purple-500 transition"
            >
              Sign in with GitHub
            </Link>
          )}
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-white/10 flex items-center justify-between px-4 md:px-6 bg-prism-bg/80 backdrop-blur sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-white/5 text-gray-400"
              aria-label="Toggle sidebar"
            >
              ☰
            </button>
            <Breadcrumbs pathname={pathname} />
          </div>
          <div className="flex items-center gap-3">
            {user && (
              <a
                href={`https://github.com/${user.login}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-500 hover:text-purple-400 hidden sm:block"
              >
                GitHub ↗
              </a>
            )}
            {user ? (
              <img
                src={user.avatar_url}
                alt=""
                className="w-8 h-8 rounded-full border border-white/10"
              />
            ) : null}
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

function Breadcrumbs({ pathname }: { pathname: string }) {
  const segments = pathname.split('/').filter(Boolean)
  const crumbs: { label: string; href: string }[] = [{ label: 'Home', href: '/dashboard' }]

  let path = ''
  for (const seg of segments) {
    path += `/${seg}`
    if (seg === 'dashboard') continue
    const label =
      seg === 'repositories'
        ? 'Repositories'
        : seg === 'pulls'
          ? 'Pull Requests'
          : seg === 'settings'
            ? 'Settings'
            : `#${seg}`
    crumbs.push({ label, href: path })
  }

  return (
    <nav className="flex items-center gap-1.5 text-sm text-gray-500">
      {crumbs.map((c, i) => (
        <span key={c.href} className="flex items-center gap-1.5">
          {i > 0 && <span>/</span>}
          <Link href={c.href} className="hover:text-white transition">
            {c.label}
          </Link>
        </span>
      ))}
    </nav>
  )
}
