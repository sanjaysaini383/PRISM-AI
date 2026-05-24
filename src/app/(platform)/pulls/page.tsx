import { Suspense } from 'react'
import PullsPageContent from './PullsContent'

export default function PullsPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="glass rounded-xl h-20 animate-pulse" />
          ))}
        </div>
      }
    >
      <PullsPageContent />
    </Suspense>
  )
}
