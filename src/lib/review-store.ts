import type { ReviewFinding, ReviewPhase, ReviewRecord, ReviewScores } from './types'
import { reviewKey } from './types'

type Listener = (record: ReviewRecord) => void

class ReviewStore {
  private records = new Map<string, ReviewRecord>()
  private listeners = new Map<string, Set<Listener>>()

  get(owner: string, repo: string, prNumber: number): ReviewRecord | undefined {
    return this.records.get(reviewKey(owner, repo, prNumber))
  }

  getAll(): ReviewRecord[] {
    return Array.from(this.records.values())
  }

  create(owner: string, repo: string, prNumber: number): ReviewRecord {
    const key = reviewKey(owner, repo, prNumber)
    const existing = this.records.get(key)
    if (existing && existing.status === 'running') {
      return existing
    }

    const record: ReviewRecord = {
      id: key,
      owner,
      repo,
      prNumber,
      status: 'pending',
      phase: 'idle',
      phaseMessage: 'Waiting to start',
      findings: [],
      scores: null,
      summary: null,
      reviewText: null,
      filesAnalyzed: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.records.set(key, record)
    this.emit(record)
    return record
  }

  update(
    owner: string,
    repo: string,
    prNumber: number,
    patch: Partial<ReviewRecord>
  ): ReviewRecord {
    const key = reviewKey(owner, repo, prNumber)
    const current = this.records.get(key)
    if (!current) {
      throw new Error(`Review not found: ${key}`)
    }
    const updated: ReviewRecord = {
      ...current,
      ...patch,
      updatedAt: new Date().toISOString(),
    }
    this.records.set(key, updated)
    this.emit(updated)
    return updated
  }

  setPhase(
    owner: string,
    repo: string,
    prNumber: number,
    phase: ReviewPhase,
    phaseMessage: string
  ) {
    return this.update(owner, repo, prNumber, {
      status: phase === 'failed' ? 'failed' : 'running',
      phase,
      phaseMessage,
    })
  }

  addFindings(
    owner: string,
    repo: string,
    prNumber: number,
    findings: ReviewFinding[]
  ) {
    const current = this.get(owner, repo, prNumber)
    if (!current) return
    return this.update(owner, repo, prNumber, {
      findings: [...current.findings, ...findings],
    })
  }

  complete(
    owner: string,
    repo: string,
    prNumber: number,
    data: {
      scores: ReviewScores
      summary: string
      reviewText: string
      filesAnalyzed: number
    }
  ) {
    return this.update(owner, repo, prNumber, {
      status: 'completed',
      phase: 'completed',
      phaseMessage: 'Review complete',
      scores: data.scores,
      summary: data.summary,
      reviewText: data.reviewText,
      filesAnalyzed: data.filesAnalyzed,
    })
  }

  fail(owner: string, repo: string, prNumber: number, error: string) {
    return this.update(owner, repo, prNumber, {
      status: 'failed',
      phase: 'failed',
      phaseMessage: error,
      error,
    })
  }

  subscribe(owner: string, repo: string, prNumber: number, listener: Listener) {
    const key = reviewKey(owner, repo, prNumber)
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set())
    }
    this.listeners.get(key)!.add(listener)
    return () => {
      this.listeners.get(key)?.delete(listener)
    }
  }

  private emit(record: ReviewRecord) {
    const set = this.listeners.get(record.id)
    set?.forEach((fn) => fn(record))
  }
}

const globalForStore = globalThis as unknown as { __reviewStore?: ReviewStore }

export const reviewStore =
  globalForStore.__reviewStore ?? new ReviewStore()

if (process.env.NODE_ENV !== 'production') {
  globalForStore.__reviewStore = reviewStore
}
