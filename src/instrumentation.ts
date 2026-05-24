/**
 * Dev TLS workaround: corporate proxy/antivirus on Windows often causes
 * UNABLE_TO_VERIFY_LEAF_SIGNATURE for GitHub, OpenAI, etc.
 * Prefer fixing system CA trust; this is a local-dev fallback only.
 */
export async function register() {
  if (process.env.NODE_ENV === 'development') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
  }
}
