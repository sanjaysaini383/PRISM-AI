/**
 * PRISM AI Design System
 * Premium dark theme with purple/magenta accent
 */

export const colors = {
  background: '#0a0e27',
  backgroundSecondary: '#12172e',
  card: 'rgba(255,255,255,0.04)',
  accent: '#a855f7',
  accentLight: '#d946ef',
  success: '#10b981',
  warning: '#f97316',
  danger: '#ef4444',
  secondary: '#8b5cf6',
  tertiary: '#f97316',
} as const

export const animations = {
  smooth: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  fade: 'opacity 0.3s ease-in-out',
  slideIn: 'all 0.4s cubic-bezier(0.23, 1, 0.320, 1)',
} as const

export const shadows = {
  sm: '0 1px 2px 0 rgba(168, 85, 247, 0.05)',
  md: '0 4px 6px -1px rgba(168, 85, 247, 0.1)',
  lg: '0 10px 15px -3px rgba(168, 85, 247, 0.15)',
  xl: '0 20px 25px -5px rgba(168, 85, 247, 0.2)',
} as const

export const gradients = {
  accent: 'linear-gradient(135deg, #a855f7 0%, #d946ef 100%)',
  secondary: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
  success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  danger: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  dark: 'linear-gradient(135deg, #1e1b4b 0%, #2e1065 100%)',
} as const
