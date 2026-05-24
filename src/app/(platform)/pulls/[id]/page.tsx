import { Suspense } from 'react'
import PullDetailContent from './PullDetailContent'

export default function PullDetailPage({ params }: { params: { id: string } }) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <PullDetailContent prId={params.id} />
    </Suspense>
  )
}
