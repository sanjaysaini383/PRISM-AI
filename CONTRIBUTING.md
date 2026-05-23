# Contributing to PRISM AI

Welcome! We're excited to have you contribute to PRISM AI.

## Code of Conduct

Please note that we have a code of conduct. By participating in this project, you agree to abide by its terms.

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Development Setup

```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/prism-ai.git
cd prism-ai

# Install dependencies
npm install

# Create a new branch
git checkout -b feature/your-feature-name

# Start development server
npm run dev
```

### Development Workflow

1. **Create a feature branch** from `main`
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make your changes** and follow our style guide

3. **Format and lint**
   ```bash
   npm run format
   npm run lint
   npm run type-check
   ```

4. **Test your changes**
   ```bash
   npm test
   ```

5. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Create a Pull Request**

## Code Style

We use:
- **TypeScript** for type safety
- **Prettier** for code formatting
- **ESLint** for linting
- **Tailwind CSS** for styling

### TypeScript Best Practices

```typescript
// ✓ Good
interface UserData {
  id: string
  email: string
  createdAt: Date
}

const getUserData = async (userId: string): Promise<UserData> => {
  return await api.getUser(userId)
}

// ✗ Avoid
const getUserData = async (userId) => {
  return await api.getUser(userId)
}
```

### Component Structure

```typescript
// components/Button.tsx
import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
}

export function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={...}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}
```

## Commit Message Convention

We follow conventional commits:

```
feat: add new feature
fix: fix a bug
docs: update documentation
style: code style changes
refactor: code refactoring
perf: performance improvements
test: add or update tests
chore: dependencies or build system
```

## Pull Request Process

1. Update README.md with any new features or changes
2. Update relevant documentation
3. Ensure tests pass: `npm test`
4. Ensure code is formatted: `npm run format`
5. Request review from maintainers

## Areas for Contribution

### Frontend
- Landing page enhancements
- Dashboard features
- PR review interface improvements
- Design system components
- Performance optimizations

### Backend Integration
- API endpoints
- GitHub integration
- Authentication system
- Database optimization

### Documentation
- API documentation
- Setup guides
- Architecture documentation
- Contributing guides

### Testing
- Unit tests
- Integration tests
- E2E tests
- Performance tests

## Questions?

- Open an issue
- Discuss in GitHub Discussions
- Join our Discord community

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to PRISM AI! 🌟
