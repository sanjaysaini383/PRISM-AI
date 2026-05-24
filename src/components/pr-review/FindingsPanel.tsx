'use client'

import { useState } from 'react'
import type { ReviewFinding } from '@/lib/api-client'
import type { ReviewScores } from '@/lib/types'

const SEVERITY_ORDER = ['critical', 'high', 'medium', 'low', 'info'] as const

export function FindingsPanel({
  findings,
  scores,
  summary,
  reviewText,
  onGenerateFix,
  selectedFile,
}: {
  findings: ReviewFinding[]
  scores: ReviewScores | null
  summary: string | null
  reviewText: string | null
  onGenerateFix: (finding: ReviewFinding) => Promise<string>
  selectedFile: string | null
}) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [fixes, setFixes] = useState<Record<string, string>>({})
  const [loadingFix, setLoadingFix] = useState<string | null>(null)

  const sorted = [...findings].sort(
    (a, b) =>
      SEVERITY_ORDER.indexOf(a.severity as (typeof SEVERITY_ORDER)[number]) -
      SEVERITY_ORDER.indexOf(b.severity as (typeof SEVERITY_ORDER)[number])
  )

  const fileFiltered = selectedFile
    ? sorted.filter((f) => !f.file || f.file === selectedFile)
    : sorted

  const handleFix = async (finding: ReviewFinding) => {
    setLoadingFix(finding.id)
    try {
      const fix = await onGenerateFix(finding)
      setFixes((prev) => ({ ...prev, [finding.id]: fix }))
      setExpanded(finding.id)
    } finally {
      setLoadingFix(null)
    }
  }

  return (
    <div className="flex flex-col gap-4 min-h-0 flex-1">
      {scores && (
        <div className="glass rounded-xl p-4 shrink-0">
          <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Scores</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <ScoreBar label="Security" value={scores.security} />
            <ScoreBar label="Performance" value={scores.performance} />
            <ScoreBar label="Architecture" value={scores.architecture} />
            <ScoreBar label="Quality" value={scores.quality} />
          </div>
        </div>
      )}

      {summary && (
        <div className="glass rounded-xl p-4 shrink-0">
          <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Summary</h3>
          <p className="text-sm text-gray-300">{summary}</p>
        </div>
      )}

      <div className="glass rounded-xl flex-1 flex flex-col min-h-0 overflow-hidden">
        <div className="p-3 border-b border-white/10 shrink-0">
          <h3 className="text-xs font-semibold text-gray-500 uppercase">
            AI Findings ({fileFiltered.length})
          </h3>
        </div>
        <ul className="flex-1 overflow-y-auto p-2 space-y-2">
          {fileFiltered.length === 0 ? (
            <li className="text-sm text-gray-500 p-4 text-center">
              Run AI review to see findings
            </li>
          ) : (
            fileFiltered.map((f) => (
              <li
                key={f.id}
                className="rounded-lg border border-white/5 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setExpanded(expanded === f.id ? null : f.id)}
                  className="w-full text-left p-3 hover:bg-white/[0.03]"
                >
                  <div className="flex items-start gap-2">
                    <SeverityBadge severity={f.severity} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{f.title}</p>
                      <p className="text-xs text-gray-500 capitalize">{f.category}</p>
                    </div>
                  </div>
                </button>
                {expanded === f.id && (
                  <div className="px-3 pb-3 border-t border-white/5 pt-2 space-y-2">
                    <p className="text-xs text-gray-400">{f.description}</p>
                    {f.suggestion && (
                      <p className="text-xs text-purple-300/80">💡 {f.suggestion}</p>
                    )}
                    {f.file && (
                      <p className="text-xs font-mono text-gray-600">
                        {f.file}
                        {f.line ? `:${f.line}` : ''}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => handleFix(f)}
                      disabled={loadingFix === f.id}
                      className="text-xs px-2 py-1 rounded bg-purple-600/80 hover:bg-purple-600 disabled:opacity-50"
                    >
                      {loadingFix === f.id ? 'Generating…' : 'Generate fix'}
                    </button>
                    {fixes[f.id] && (
                      <pre className="text-xs bg-black/30 rounded p-2 overflow-x-auto whitespace-pre-wrap">
                        {fixes[f.id]}
                      </pre>
                    )}
                  </div>
                )}
              </li>
            ))
          )}
        </ul>
      </div>

      {reviewText && (
        <details className="glass rounded-xl shrink-0">
          <summary className="p-3 text-xs font-semibold text-gray-500 uppercase cursor-pointer">
            Full review
          </summary>
          <div className="px-3 pb-3 text-sm text-gray-400 whitespace-pre-wrap max-h-48 overflow-y-auto">
            {reviewText}
          </div>
        </details>
      )}
    </div>
  )
}

function SeverityBadge({ severity }: { severity: string }) {
  const colors: Record<string, string> = {
    critical: 'bg-red-500/20 text-red-400',
    high: 'bg-orange-500/20 text-orange-400',
    medium: 'bg-yellow-500/20 text-yellow-400',
    low: 'bg-blue-500/20 text-blue-400',
    info: 'bg-gray-500/20 text-gray-400',
  }
  return (
    <span
      className={`shrink-0 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${colors[severity] || colors.info}`}
    >
      {severity[0]}
    </span>
  )
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-500">{label}</span>
        <span className="font-mono">{value}</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-purple-500 rounded-full transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}
