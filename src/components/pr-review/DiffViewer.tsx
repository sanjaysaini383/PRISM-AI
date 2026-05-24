'use client'

import type { PRFile } from '@/lib/types'
import type { ReviewFinding } from '@/lib/api-client'

const SEVERITY_COLORS: Record<string, string> = {
  critical: 'border-l-red-500 bg-red-500/10',
  high: 'border-l-orange-500 bg-orange-500/10',
  medium: 'border-l-yellow-500 bg-yellow-500/10',
  low: 'border-l-blue-500 bg-blue-500/10',
  info: 'border-l-gray-500 bg-gray-500/10',
}

export function DiffViewer({
  file,
  findings,
}: {
  file?: PRFile
  findings: ReviewFinding[]
}) {
  if (!file) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
        Select a file to view changes
      </div>
    )
  }

  const lines = (file.patch || '').split('\n')
  const findingsByLine = new Map<number, ReviewFinding[]>()
  for (const f of findings) {
    if (f.line) {
      const list = findingsByLine.get(f.line) || []
      list.push(f)
      findingsByLine.set(f.line, list)
    }
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="p-3 border-b border-white/10 flex items-center justify-between shrink-0">
        <span className="font-mono text-sm truncate">{file.filename}</span>
        <span className="text-xs text-gray-500 font-mono shrink-0 ml-2">
          +{file.additions} -{file.deletions}
        </span>
      </div>
      <div className="flex-1 overflow-auto">
        {lines.length > 0 ? (
          <table className="w-full text-xs font-mono">
            <tbody>
              {lines.map((line, idx) => {
                const lineNum = extractLineNumber(line, idx)
                const lineFindings = lineNum ? findingsByLine.get(lineNum) : undefined
                const lineClass =
                  line.startsWith('+') && !line.startsWith('+++')
                    ? 'bg-green-500/10'
                    : line.startsWith('-') && !line.startsWith('---')
                      ? 'bg-red-500/10'
                      : ''

                return (
                  <tr key={idx} className={lineClass}>
                    <td className="w-10 px-2 py-0 text-gray-600 select-none text-right align-top">
                      {lineNum || ''}
                    </td>
                    <td className="px-2 py-0 whitespace-pre-wrap break-all">{line}</td>
                    <td className="w-48 align-top p-0">
                      {lineFindings?.map((f) => (
                        <div
                          key={f.id}
                          className={`border-l-2 px-2 py-1 m-0.5 text-[10px] ${SEVERITY_COLORS[f.severity] || ''}`}
                          title={f.description}
                        >
                          <span className="font-semibold uppercase">{f.severity}</span>{' '}
                          {f.title}
                        </div>
                      ))}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : (
          <p className="p-4 text-gray-500 text-sm">No patch available for this file.</p>
        )}
      </div>
    </div>
  )
}

function extractLineNumber(line: string, fallback: number): number | null {
  const match = line.match(/^@@ .* \+(\d+)/)
  if (match) return parseInt(match[1], 10)
  if (line.startsWith('+') || line.startsWith(' ')) return fallback + 1
  return null
}
