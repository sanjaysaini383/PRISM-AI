'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { usePullRequest, useStartReview } from '@/lib/hooks'
import {
  subscribeReviewStream,
  fetchReviewResults,
  generateFix,
  type ReviewFinding,
} from '@/lib/api-client'
import type { ReviewScores } from '@/lib/types'
import { DiffViewer } from '@/components/pr-review/DiffViewer'
import { FindingsPanel } from '@/components/pr-review/FindingsPanel'
import { ReviewProgress } from '@/components/pr-review/ReviewProgress'

export default function PullDetailContent({ prId }: { prId: string }) {
  const searchParams = useSearchParams()
  const owner = searchParams.get('owner') || ''
  const repo = searchParams.get('repo') || ''
  const prNumber = parseInt(prId, 10)

  const { data: pr, isLoading, error } = usePullRequest(owner, repo, prNumber)
  const startReview = useStartReview()

  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [findings, setFindings] = useState<ReviewFinding[]>([])
  const [scores, setScores] = useState<ReviewScores | null>(null)
  const [summary, setSummary] = useState<string | null>(null)
  const [reviewText, setReviewText] = useState<string | null>(null)
  const [phase, setPhase] = useState('idle')
  const [phaseMessage, setPhaseMessage] = useState('')
  const [reviewStatus, setReviewStatus] = useState<
    'idle' | 'running' | 'completed' | 'failed'
  >('idle')

  useEffect(() => {
    if (!owner || !repo || !prNumber) return
    fetchReviewResults(owner, repo, prNumber)
      .then((r) => {
        if (r.status === 'completed') {
          setFindings(r.findings)
          setScores(r.scores)
          setSummary(r.summary)
          setReviewText(r.review)
          setReviewStatus('completed')
          setPhase('completed')
        } else if (r.status === 'running') {
          setReviewStatus('running')
          setPhase(r.phase)
          setPhaseMessage(r.phaseMessage)
          setFindings(r.findings)
        }
      })
      .catch(() => {})
  }, [owner, repo, prNumber])

  const handleStartReview = useCallback(async () => {
    setReviewStatus('running')
    setFindings([])
    setScores(null)
    setSummary(null)

    await startReview.mutateAsync({ owner, repo, prNumber })

    const unsubscribe = subscribeReviewStream(owner, repo, prNumber, {
      onStatus: (data) => {
        setPhase(data.phase)
        setPhaseMessage(data.phaseMessage)
        if (data.status === 'failed') setReviewStatus('failed')
        else if (data.status === 'completed') setReviewStatus('completed')
        else setReviewStatus('running')
      },
      onFindings: (newFindings) => {
        setFindings((prev) => {
          const ids = new Set(prev.map((f) => f.id))
          return [...prev, ...newFindings.filter((f) => !ids.has(f.id))]
        })
      },
      onComplete: (data) => {
        setScores(data.scores)
        setSummary(data.summary)
        setReviewStatus('completed')
        setPhase('completed')
        fetchReviewResults(owner, repo, prNumber).then((r) => {
          setReviewText(r.review)
          setFindings(r.findings)
        })
        unsubscribe()
      },
      onError: (msg) => {
        setReviewStatus('failed')
        setPhaseMessage(msg)
        unsubscribe()
      },
    })
  }, [owner, repo, prNumber, startReview])

  const handleGenerateFix = useCallback(
    async (finding: ReviewFinding) => {
      const file = pr?.files.find((f) => f.filename === finding.file)
      const { fix } = await generateFix(finding, file?.patch)
      return fix
    },
    [pr]
  )

  useEffect(() => {
    if (pr?.files.length && !selectedFile) {
      setSelectedFile(pr.files[0].filename)
    }
  }, [pr, selectedFile])

  if (!owner || !repo) {
    return (
      <p className="text-gray-500">Missing owner/repo. Go back to repositories.</p>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error || !pr) {
    return (
      <div className="glass rounded-xl p-6 text-red-400">
        Failed to load PR: {(error as Error)?.message || 'Not found'}
      </div>
    )
  }

  const activeFile = pr.files.find((f) => f.filename === selectedFile)

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-[1600px]">
      <div className="shrink-0 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Link href={`/pulls?owner=${owner}&repo=${repo}`} className="hover:text-purple-400">
            ← {owner}/{repo}
          </Link>
        </div>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold">{pr.title}</h1>
            <p className="text-sm text-gray-500 mt-1">
              #{pr.number} · @{pr.author} · {pr.headRef} → {pr.baseRef}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {scores && (
              <div className="text-right">
                <p className="text-2xl font-mono font-bold text-purple-400">
                  {scores.mergeConfidence}%
                </p>
                <p className="text-xs text-gray-500">merge confidence</p>
              </div>
            )}
            <button
              type="button"
              onClick={handleStartReview}
              disabled={reviewStatus === 'running' || startReview.isPending}
              className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition"
            >
              {reviewStatus === 'running' ? 'Analyzing…' : 'Run AI Review'}
            </button>
            {pr.url && (
              <a
                href={pr.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-lg border border-white/10 text-sm hover:bg-white/5"
              >
                GitHub ↗
              </a>
            )}
          </div>
        </div>

        {reviewStatus === 'running' && (
          <ReviewProgress phase={phase} message={phaseMessage} />
        )}
      </div>

      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        <aside className="col-span-12 lg:col-span-2 glass rounded-xl overflow-hidden flex flex-col min-h-0">
          <div className="p-3 border-b border-white/10 text-xs font-semibold text-gray-500 uppercase">
            Changed files ({pr.files.length})
          </div>
          <ul className="flex-1 overflow-y-auto p-2 text-sm">
            {pr.files.map((f) => (
              <li key={f.filename}>
                <button
                  type="button"
                  onClick={() => setSelectedFile(f.filename)}
                  className={`w-full text-left px-2 py-1.5 rounded truncate font-mono text-xs ${
                    selectedFile === f.filename
                      ? 'bg-purple-500/20 text-purple-300'
                      : 'hover:bg-white/5 text-gray-400'
                  }`}
                >
                  <span className="opacity-60 mr-1">
                    {f.status === 'added' ? '+' : f.status === 'removed' ? '−' : '~'}
                  </span>
                  {f.filename.split('/').pop()}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="col-span-12 lg:col-span-7 glass rounded-xl overflow-hidden flex flex-col min-h-0">
          <DiffViewer
            file={activeFile}
            findings={findings.filter((f) => !f.file || f.file === selectedFile)}
          />
        </div>

        <div className="col-span-12 lg:col-span-3 min-h-0 flex flex-col gap-4">
          <FindingsPanel
            findings={findings}
            scores={scores}
            summary={summary}
            reviewText={reviewText}
            onGenerateFix={handleGenerateFix}
            selectedFile={selectedFile}
          />
        </div>
      </div>
    </div>
  )
}
