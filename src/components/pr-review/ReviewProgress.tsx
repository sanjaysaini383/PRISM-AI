'use client'

const PHASE_LABELS: Record<string, string> = {
  fetching: 'Fetching PR',
  parsing: 'Parsing diff',
  security: 'Security review',
  performance: 'Performance analysis',
  architecture: 'Architecture check',
  quality: 'Code quality',
  summarizing: 'Generating summary',
}

export function ReviewProgress({ phase, message }: { phase: string; message: string }) {
  const phases = ['parsing', 'security', 'performance', 'architecture', 'quality', 'summarizing']
  const currentIndex = phases.indexOf(phase)

  return (
    <div className="mt-4 glass rounded-lg p-4 border border-purple-500/20">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
        <span className="text-sm font-mono text-purple-300">
          {PHASE_LABELS[phase] || phase}: {message}
        </span>
      </div>
      <div className="flex gap-1">
        {phases.map((p, i) => (
          <div
            key={p}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= currentIndex ? 'bg-purple-500' : 'bg-white/10'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
