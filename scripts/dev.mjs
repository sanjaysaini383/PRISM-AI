/**
 * Starts Next.js dev server with TLS workaround applied before any modules load.
 * Frees port 3000 if a stale Node process is blocking it (common after Ctrl+C).
 */
import { spawn, execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const port = process.env.PORT || '3000'

if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
  // Suppress repetitive TLS warning in dev (workaround is intentional locally)
  process.env.NODE_NO_WARNINGS = '1'
}

function freePortIfStaleNode(listenPort) {
  if (process.platform !== 'win32') return

  try {
    const output = execSync(
      `netstat -ano | findstr :${listenPort} | findstr LISTENING`,
      { encoding: 'utf8' }
    )
    const lines = output.trim().split('\n').filter(Boolean)
    const pids = new Set()

    for (const line of lines) {
      const pid = line.trim().split(/\s+/).pop()
      if (pid && pid !== '0') pids.add(pid)
    }

    for (const pid of pids) {
      try {
        const task = execSync(`tasklist /FI "PID eq ${pid}" /FO CSV`, {
          encoding: 'utf8',
        })
        if (!task.toLowerCase().includes('node.exe')) continue

        console.log(
          `Port ${listenPort} in use by stale Node (PID ${pid}). Stopping it…`
        )
        execSync(`taskkill /PID ${pid} /F`)
      } catch {
        // Process may have already exited
      }
    }
  } catch {
    // Port is free
  }
}

freePortIfStaleNode(port)

const nextBin = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'node_modules',
  'next',
  'dist',
  'bin',
  'next'
)

const child = spawn(process.execPath, [nextBin, 'dev', '-p', port], {
  stdio: 'inherit',
  env: { ...process.env, PORT: port },
  shell: false,
})

child.on('exit', (code) => process.exit(code ?? 0))
