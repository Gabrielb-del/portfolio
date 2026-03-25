export const theme = {
  colors: {
    primary: '#0ea5a5',
    secondary: '#06b6d4',
    accent: '#f59e0b',
    background: '#05070a',
    backgroundLight: '#0f1722',
    surface: '#111b28',
    text: '#f5f7fa',
    textSecondary: 'rgba(231, 236, 243, 0.78)',
  },
  gradients: {
    primary: 'linear-gradient(120deg, #0ea5a5, #06b6d4)',
    softGlow: 'radial-gradient(circle at 10% 10%, rgba(14, 165, 165, 0.16), transparent 40%)',
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