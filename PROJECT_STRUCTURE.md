# PRISM AI - Project Structure

```
prism-ai/
├── public/                      # Static assets
│   ├── logo.svg
│   └── favicon.ico
│
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx           # Root layout with metadata
│   │   ├── globals.css          # Global styles
│   │   ├── page.tsx             # Home page
│   │   ├── dashboard/
│   │   │   └── page.tsx         # Dashboard page
│   │   └── pr-review/
│   │       └── page.tsx         # PR review interface
│   │
│   ├── components/
│   │   ├── landing/             # Landing page components
│   │   │   ├── LandingPage.tsx
│   │   │   └── sections/
│   │   │       ├── HeroSection.tsx
│   │   │       ├── FeaturesSection.tsx
│   │   │       ├── DemoSection.tsx
│   │   │       ├── MetricsSection.tsx
│   │   │       ├── CTASection.tsx
│   │   │       └── Footer.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── TopBar.tsx
│   │   │   └── tabs/
│   │   │       ├── OverviewTab.tsx
│   │   │       ├── PullRequestsTab.tsx
│   │   │       └── SecurityAlertsTab.tsx
│   │   │
│   │   ├── pr-review/
│   │   │   ├── PRReviewHeader.tsx
│   │   │   ├── PRReviewTabs.tsx
│   │   │   ├── CodeDiff.tsx
│   │   │   ├── MergeConfidence.tsx
│   │   │   └── AIAnalysisPanel.tsx
│   │   │
│   │   └── Navigation.tsx
│   │
│   └── lib/
│       ├── design-system.ts     # Color palette & animations
│       ├── mock-data.ts         # Hackathon demo data
│       ├── env.ts               # Environment config
│       └── store.ts             # Zustand state management
│
├── __tests__/
│   └── main.test.ts
│
├── tailwind.config.ts           # Tailwind CSS config
├── postcss.config.js            # PostCSS config
├── next.config.js               # Next.js config
├── tsconfig.json                # TypeScript config
├── jest.config.ts               # Jest config
├── package.json
├── .env.example
├── action.yml                   # GitHub Action metadata
├── README.md                    # Comprehensive README
└── LICENSE
```

## Key Features

### Frontend Architecture
- **Next.js 14+**: Modern React framework with App Router
- **Tailwind CSS**: Utility-first styling with custom PRISM theme
- **Framer Motion**: Smooth animations and transitions
- **TypeScript**: Type-safe development
- **Zustand**: Lightweight state management

### Design System
- Premium dark theme inspired by Linear, Vercel, Raycast
- Glassmorphism UI components
- Animated gradients and glowing effects
- Responsive design for all screen sizes

### Pages

#### 1. Landing Page (`/`)
- Hero section with animated gradient text
- Features showcase
- Live demo preview
- Metrics section
- CTA buttons
- Modern footer

#### 2. Dashboard (`/dashboard`)
- Sidebar navigation
- Overview tab with statistics
- Pull requests tab with filtering
- Security alerts tab
- Real-time analytics
- Team insights

#### 3. PR Review (`/pr-review`)
- Advanced PR analysis interface
- Code diff viewer
- Multi-agent analysis panel
- Merge confidence circular progress
- Security/Performance/Architecture tabs
- AI-generated suggestions

### State Management
- UI state (sidebar, theme)
- Analysis state (agents, progress)
- Cache management with React Query

### Mock Data (for Hackathon)
- Realistic PR analysis results
- Pre-configured security alerts
- Dashboard statistics
- AI findings with severity levels

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Format code
npm run format

# Type checking
npm run type-check
```

## Performance Optimizations

- Code splitting with Next.js
- Image optimization
- Font optimization with next/font
- CSS-in-JS minification
- React Query for efficient data fetching

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
