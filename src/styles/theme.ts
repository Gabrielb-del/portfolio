export const theme = {
  colors: {
    primary: '#6C63FF',
    secondary: '#FF6584',
    background: '#0a0a0a',
    backgroundLight: '#1a1a1a',
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.8)',
  },
  gradients: {
    primary: 'linear-gradient(45deg, #6C63FF, #FF6584)',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1440px',
  },
  transitions: {
    default: '0.3s ease',
    slow: '0.6s ease',
    fast: '0.15s ease',
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.2)',
    large: '0 8px 16px rgba(0, 0, 0, 0.3)',
  },
} as const;

export type Theme = typeof theme; 