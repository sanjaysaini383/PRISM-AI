# 🚀 PRISM AI - Getting Started Guide

Welcome to PRISM AI! This guide will help you get up and running with the platform in minutes.

## ⚡ Quick Start (5 minutes)

### 1. Clone the Repository
```bash
git clone https://github.com/prism-ai/engineering-platform.git
cd prism-ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Open in Browser
Navigate to `http://localhost:3000` 🎉

## 📺 Exploring the Platform

### Landing Page (`/`)
- **Hero Section**: Animated gradient text and futuristic design
- **Features**: Six premium features with icons
- **Live Demo**: Interactive code analysis example
- **Metrics**: 70% faster, 40% fewer bugs, 3x productivity
- **Call-to-Action**: Try PRISM AI today

### Dashboard (`/dashboard`)
- **Navigation**: Sidebar with six analysis categories
- **Overview**: Key statistics and recent activity
- **Pull Requests**: Detailed PR analysis and filtering
- **Security Alerts**: Real-time vulnerability tracking
- **Analytics**: Team productivity metrics

### PR Review Interface (`/pr-review`)
- **Code Analysis**: Detailed diff viewer
- **AI Agents**: Multi-agent analysis panel
- **Merge Confidence**: Visual scoring meter
- **Security/Performance/Architecture**: Dedicated analysis tabs
- **Suggested Fixes**: AI-generated code improvements

## 🎨 Customization

### Colors
Edit `src/lib/design-system.ts`:
```typescript
export const colors = {
  background: '#050816',
  accent: '#00d9ff',
  // ... modify as needed
}
```

### Tailwind Configuration
Edit `tailwind.config.ts` to customize the theme:
```typescript
theme: {
  extend: {
    colors: {
      'prism': {
        'bg': '#050816',
        // ... custom colors
      }
    },
  },
}
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker
```bash
# Build image
docker build -t prism-ai .

# Run container
docker run -p 3000:3000 prism-ai
```

### Manual Deployment
```bash
npm run build
npm start
```

## 📦 Building for Production

```bash
# Build optimized version
npm run build

# Test production build locally
npm start

# Your app is ready at http://localhost:3000
```

## 🧪 Testing

```bash
# Run tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm test -- --coverage
```

## 💻 Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | Check TypeScript types |
| `npm test` | Run tests |

## 📁 Project Structure

```
prism-ai/
├── src/app/              # Next.js pages
├── src/components/       # React components
├── src/lib/              # Utilities & helpers
├── public/               # Static files
├── tailwind.config.ts    # Tailwind theme
├── next.config.js        # Next.js config
└── package.json          # Dependencies
```

## 🔧 Configuration

### Environment Variables
Create `.env.local`:
```env
# Required
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Optional
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_client_id
GITHUB_APP_ID=your_app_id
OPENAI_API_KEY=sk-...
```

### Next.js Config
Edit `next.config.js`:
```javascript
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // ... other options
}
```

## 📚 Learn More

- [Project Structure](./PROJECT_STRUCTURE.md)
- [Architecture](./ARCHITECTURE.md)
- [Contributing](./CONTRIBUTING.md)
- [README](./README.md)

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

### Clear Cache
```bash
rm -rf .next
npm run dev
```

### TypeScript Errors
```bash
npm run type-check
```

## 🎯 Next Steps

1. **Explore Components**: Check `src/components/` for reusable components
2. **Customize Theme**: Modify `tailwind.config.ts` for your branding
3. **Add Features**: Extend the platform with new pages and functionality
4. **Deploy**: Push to Vercel or your hosting platform
5. **Integrate**: Connect with GitHub, GitLab, or Bitbucket

## 📞 Support

- **Documentation**: [docs.prism-ai.dev](https://docs.prism-ai.dev)
- **Issues**: [GitHub Issues](https://github.com/prism-ai/engineering-platform/issues)
- **Discord**: [discord.gg/prism-ai](https://discord.gg/prism-ai)
- **Email**: support@prism-ai.dev

## ✨ Features Walkthrough

### Landing Page Demo
- Smooth scroll animations
- Gradient text effects
- Interactive demo section
- Responsive design
- Modern navigation

### Dashboard Analytics
- Real-time metrics
- Interactive charts
- Sidebar navigation
- Responsive layout
- Dark theme

### PR Review Interface
- Code diff viewer
- Multi-agent analysis
- Merge confidence scoring
- Security analysis
- Performance suggestions

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [React](https://react.dev/)

## 🌟 Tips & Tricks

1. **Hot Reload**: Changes auto-reload during development
2. **TypeScript**: Full type safety for better development
3. **Tailwind**: Use utility classes for rapid UI development
4. **Framer Motion**: Add animations with minimal code
5. **Mock Data**: Use mock data for demos without backend

## 🚀 Performance Tips

1. **Image Optimization**: Use Next.js Image component
2. **Code Splitting**: Automatic route-based splitting
3. **Font Optimization**: Use next/font for fonts
4. **CSS Optimization**: Tailwind purges unused CSS
5. **Caching**: React Query handles API caching

---

**Ready to build something amazing with PRISM AI?** 🌟

Start by running: `npm run dev`

Then visit: `http://localhost:3000`

Enjoy! 🚀
