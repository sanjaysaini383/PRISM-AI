import { NextRequest } from 'next/server'
import { requireGitHubToken, AuthError } from '@/lib/auth'
import { reviewStore } from '@/lib/review-store'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireGitHubToken()
    const prNumber = parseInt(params.id, 10)
    const { searchParams } = new URL(request.url)
    const owner = searchParams.get('owner')
    const repo = searchParams.get('repo')

    if (!owner || !repo) {
      return new Response('owner and repo required', { status: 400 })
    }

    const encoder = new TextEncoder()

    const stream = new ReadableStream({
      start(controller) {
        const send = (event: string, data: unknown) => {
          controller.enqueue(
            encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
          )
        }

        const existing = reviewStore.get(owner, repo, prNumber)
        if (existing) {
          send('status', {
            phase: existing.phase,
            phaseMessage: existing.phaseMessage,
            status: existing.status,
            findingsCount: existing.findings.length,
          })
          if (existing.findings.length > 0) {
            send('findings', { findings: existing.findings })
          }
          if (existing.status === 'completed') {
            send('complete', {
              scores: existing.scores,
              summary: existing.summary,
            })
            controller.close()
            return
          }
          if (existing.status === 'failed') {
            send('error', { message: existing.error })
            controller.close()
            return
          }
        }

        let lastFindingCount = existing?.findings.length ?? 0
        let lastPhase = existing?.phase ?? 'idle'

        const unsubscribe = reviewStore.subscribe(
          owner,
          repo,
          prNumber,
          (record) => {
            if (record.phase !== lastPhase) {
              lastPhase = record.phase
              send('status', {
                phase: record.phase,
                phaseMessage: record.phaseMessage,
                status: record.status,
                findingsCount: record.findings.length,
              })
            }

            if (record.findings.length > lastFindingCount) {
              const newFindings = record.findings.slice(lastFindingCount)
              lastFindingCount = record.findings.length
              send('findings', { findings: newFindings })
            }

            if (record.status === 'completed') {
              send('complete', {
                scores: record.scores,
                summary: record.summary,
                review: record.reviewText,
              })
              unsubscribe()
              controller.close()
            }

            if (record.status === 'failed') {
              send('error', { message: record.error })
              unsubscribe()
              controller.close()
            }
          }
        )

        request.signal.addEventListener('abort', () => {
          unsubscribe()
          controller.close()
        })

        const heartbeat = setInterval(() => {
          controller.enqueue(encoder.encode(': heartbeat\n\n'))
        }, 15000)

        request.signal.addEventListener('abort', () => clearInterval(heartbeat))
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return new Response('Unauthorized', { status: 401 })
    }
    return new Response('Stream error', { status: 500 })
  }
}
