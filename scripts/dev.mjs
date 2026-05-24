/**
 * Starts Next.js dev server with TLS workaround applied before any modules load.
 * Required on some Windows setups (corporate proxy / SSL inspection).
 */
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
}

const nextBin = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'node_modules',
  'next',
  'dist',
  'bin',
  'next'
)

const child = spawn(process.execPath, [nextBin, 'dev'], {
  stdio: 'inherit',
  env: process.env,
  shell: false,
})

child.on('exit', (code) => process.exit(code ?? 0))
