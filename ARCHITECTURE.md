# PRISM AI Platform - Architecture & Tech Stack

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        End Users                            │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   Frontend Layer (Next.js)                   │
│  ┌────────────────┬────────────────┬──────────────────┐     │
│  │ Landing Page   │ Dashboard      │ PR Review UI     │     │
│  │ - Hero         │ - Analytics    │ - Code Diff      │     │
│  │ - Features     │ - Metrics      │ - AI Analysis    │     │
│  │ - Demo         │ - PRs List     │ - Merge Score    │     │
│  └────────────────┴────────────────┴──────────────────┘     │
│                                                              │
│  Styling: Tailwind CSS + Framer Motion                      │
│  State: Zustand + React Query                               │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│              API Layer (Next.js API Routes)                  │
│  /api/pr/analyze          - Trigger PR analysis             │
│  /api/pr/status           - Get analysis status             │
│  /api/dashboard/stats     - Dashboard metrics               │
│  /api/github/webhook      - GitHub webhooks                 │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│            Multi-Agent AI System Layer                        │
│  ┌─────────────┬──────────────┬────────────────────┐         │
│  │ Security    │ Performance  │ Architecture       │         │
│  │ Agent       │ Agent        │ Agent              │         │
│  └─────────────┴──────────────┴────────────────────┘         │
│  ┌─────────────┬──────────────┐                             │
│  │ Code Quality│ Testing      │                             │
│  │ Agent       │ Agent        │                             │
│  └─────────────┴──────────────┘                             │
│                                                              │
│  Each agent powered by:                                      │
│  - OpenAI GPT-4                                              │
│  - Anthropic Claude                                          │
│  - Fine-tuned models                                         │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│              Integration Layer                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ GitHub Integration                                   │   │
│  │ - Webhook listener                                   │   │
│  │ - PR analysis trigger                                │   │
│  │ - Comment posting                                    │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│              Data Layer                                      │
│  ┌────────────────┬──────────────┬────────────────────┐     │
│  │ PostgreSQL     │ Redis        │ S3/Blob Storage    │     │
│  │ - PR data      │ - Cache      │ - Analysis logs    │     │
│  │ - Analytics    │ - Sessions   │ - Code artifacts   │     │
│  │ - Users        │ - Queues     │                    │     │
│  └────────────────┴──────────────┴────────────────────┘     │
└──────────────────────────────────────────────────────────────┘
```

## Tech Stack

### Frontend
| Technology | Purpose | Version |
|---|---|---|
| **Next.js** | React framework | 14+ |
| **React** | UI library | 18+ |
| **TypeScript** | Type safety | 5+ |
| **Tailwind CSS** | Styling | 3+ |
| **Framer Motion** | Animations | 10+ |
| **Zustand** | State management | 4+ |
| **React Query** | Data fetching | 5+ |

### Backend/AI
| Technology | Purpose |
|---|---|
| **Node.js** | Runtime |
| **OpenAI GPT-4** | Primary LLM |
| **Anthropic Claude** | Backup LLM |
| **GitHub API** | PR integration |

### Data
| Technology | Purpose |
|---|---|
| **PostgreSQL** | Primary database |
| **Redis** | Caching & queues |
| **Prisma** | ORM |

### DevOps
| Technology | Purpose |
|---|---|
| **Docker** | Containerization |
| **Vercel/AWS** | Hosting |
| **GitHub Actions** | CI/CD |

## Data Flow

### PR Analysis Flow
```
1. PR Created/Updated
   ↓
2. GitHub Webhook Trigger
   ↓
3. PRISM AI Receives Event
   ↓
4. Parse PR Changes
   ↓
5. Distribute to AI Agents (Parallel)
   ├→ Security Agent
   ├→ Performance Agent
   ├→ Architecture Agent
   ├→ Code Quality Agent
   └→ Testing Agent
   ↓
6. Aggregate Results
   ↓
7. Calculate Merge Confidence
   ↓
8. Generate Patches (if needed)
   ↓
9. Post Comment to GitHub
   ↓
10. Store Analysis in Database
```

### User Dashboard Flow
```
1. User Visits Dashboard
   ↓
2. Fetch Cached Analytics (Redis)
   ↓
3. Calculate Aggregated Metrics
   ↓
4. Render Interactive Charts
   ↓
5. Display Recent PRs & Findings
   ↓
6. Enable Real-time Updates (WebSocket)
```

## AI Agent Architecture

Each agent is independent and can be scaled separately:

```typescript
interface AIAgent {
  name: string
  description: string
  analyze(code: string, context: PRContext): Promise<Analysis>
  calculateScore(analysis: Analysis): number
}

class SecurityAgent implements AIAgent {
  // Vulnerability detection
  // Compliance checking
  // Secrets scanning
}

class PerformanceAgent implements AIAgent {
  // Bottleneck detection
  // Complexity analysis
  // Optimization suggestions
}

class ArchitectureAgent implements AIAgent {
  // Design pattern analysis
  // Dependency checking
  // Structural risks
}

class CodeQualityAgent implements AIAgent {
  // Maintainability scoring
  // Best practices enforcement
  // Style consistency
}

class TestingAgent implements AIAgent {
  // Coverage analysis
  // Edge case suggestions
  // Test quality assessment
}
```

## Performance Considerations

### Optimization Strategies
1. **Parallel Agent Processing** - All agents run simultaneously
2. **Result Caching** - Store similar analyses for quick retrieval
3. **Incremental Analysis** - Only analyze changed lines
4. **Token Optimization** - Compress context to fit token limits
5. **Batch Processing** - Group small PRs for efficiency

### Scalability
- **Horizontal**: Distribute agents across multiple workers
- **Vertical**: Increase resources per agent
- **Caching**: Redis for frequent results
- **Queue**: Bull/RabbitMQ for job management

## Security

- ✓ Environment variable protection
- ✓ API key encryption
- ✓ JWT authentication
- ✓ CORS configuration
- ✓ Rate limiting
- ✓ Input validation
- ✓ SQL injection prevention
- ✓ Secrets scanning

## Deployment

### Local Development
```bash
npm install
npm run dev
```

### Production (Vercel)
```bash
git push
# Auto-deploys via GitHub integration
```

### Docker
```bash
docker build -t prism-ai .
docker run -p 3000:3000 prism-ai
```

---

For more details, see [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)
