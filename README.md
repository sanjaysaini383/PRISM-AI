# CodingFox — AI GitHub PR Review Platform

CodingFox is a Next.js application that connects to GitHub via OAuth, fetches real pull requests and diffs, and runs a multi-phase OpenAI code review with **Server-Sent Events** streaming.

## Architecture

```
┌─────────────┐     OAuth      ┌──────────────┐
│   Browser   │◄──────────────►│  GitHub API  │
└──────┬──────┘                └──────────────┘
       │
       │  REST + SSE
       ▼
┌──────────────────────────────────────────────┐
│  Next.js App Router (src/app/api/*)          │
│  • /api/repos, /api/pulls, /api/pulls/[id]   │
│  • /api/review/[id] (POST)                   │
│  • /api/review-status/[id]                   │
│  • /api/review-results/[id]                  │
│  • /api/review/[id]/stream (SSE)             │
└──────────────────┬───────────────────────────┘
                   │
                   ▼
         ┌─────────────────┐
         │  review-service │──► OpenAI API
         │  review-store   │    (in-memory session)
         └─────────────────┘

Optional CI path:
┌─────────────────┐     GitHub Actions    ┌──────────────┐
│  src/review.ts  │◄─────────────────────►│  PR events   │
└─────────────────┘                       └──────────────┘
```

### Review pipeline

1. **Fetch** — PR metadata + file patches from GitHub
2. **Parse** — Build diff context from patches
3. **Analyze** — OpenAI passes: security → performance → architecture → quality
4. **Summarize** — Merge confidence + category scores
5. **Stream** — Findings and phase updates via SSE

## Setup

### 1. GitHub OAuth App

1. GitHub → Settings → Developer settings → OAuth Apps → New
2. **Authorization callback URL:** `http://localhost:3000/api/auth/github/callback`
3. Copy Client ID and generate Client Secret

### 2. Environment variables

Create `.env.local`:

```env
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000

OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
```

### 3. Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) → **Sign in with GitHub** → **Repositories** → select repo → open a PR → **Run AI Review**.

### 4. GitHub Action (optional)

The repo includes the original CodeFox review action (`src/review.ts`, `action.yml`). Configure `.github/workflows/codefox-review.yml` with `OPENAI_API_KEY` in repository secrets for CI-based reviews on PR events.

## API reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user` | Authenticated GitHub user |
| GET | `/api/repos` | User repositories |
| GET | `/api/pulls?owner=&repo=` | PR list |
| GET | `/api/pulls/:id?owner=&repo=` | PR detail + file patches |
| POST | `/api/review/:id` | Start AI review `{ owner, repo }` |
| GET | `/api/review-status/:id?owner=&repo=` | Review phase/status |
| GET | `/api/review-results/:id?owner=&repo=` | Findings + scores |
| GET | `/api/review/:id/stream?owner=&repo=` | SSE progress stream |
| POST | `/api/review/fix` | Generate fix for a finding |

All endpoints require the `github_token` httpOnly cookie (set after OAuth).

## Frontend routes

| Route | Description |
|-------|-------------|
| `/` | Minimal landing + sign in |
| `/dashboard` | Review stats (from completed reviews) |
| `/repositories` | GitHub repo list |
| `/pulls?owner=&repo=` | PR list |
| `/pulls/:id?owner=&repo=` | Diff viewer + AI review |
| `/settings` | Account & integration info |

State management: **TanStack React Query** for server data; review streaming via **EventSource**.

## Tech stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Octokit (GitHub REST)
- OpenAI SDK
- TanStack Query

## Notes

- Review results are stored **in-memory** per server instance (fine for local dev; use Redis/DB for production).
- Without `OPENAI_API_KEY`, reviews run but AI phases return empty findings.
- The legacy `POST /api/reviews` endpoint redirects to the new review flow.

## License

MIT
