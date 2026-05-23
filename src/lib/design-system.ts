/**
 * PRISM AI Design System
 * Premium dark theme colors and utilities
 */

export const colors = {
  background: '#050816',
  backgroundSecondary: '#0f1728',
  card: 'rgba(255,255,255,0.05)',
  accent: '#00d9ff',
  accentDark: '#0099cc',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  secondary: '#8b5cf6',
} as const

export const animations = {
  smooth: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  fade: 'opacity 0.3s ease-in-out',
} as const

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
} as const

export const gradients = {
  accent: 'linear-gradient(135deg, #00d9ff 0%, #0099cc 100%)',
  purple: 'linear-gradient(135deg, #7c3aed 0%, #0099cc 100%)',
  success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  danger: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
} as const
