
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(210 40% 95%)',
        accent: 'hsl(240 80% 70%)',
        primary: 'hsl(210 40% 90%)',
        surface: 'hsl(210 40% 98%)',
        'text-primary': 'hsl(210 40% 15%)',
        'text-secondary': 'hsl(210 40% 35%)',
      },
      spacing: {
        sm: '8px',
        md: '12px',
        lg: '20px',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
      },
      boxShadow: {
        card: '0 4px 12px hsla(210, 40%, 15%, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 250ms cubic-bezier(0.22,1,0.36,1)',
        'slide-up': 'slideUp 250ms cubic-bezier(0.22,1,0.36,1)',
        'fade-fast': 'fadeIn 150ms cubic-bezier(0.22,1,0.36,1)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.22,1,0.36,1)',
      },
      transitionDuration: {
        'base': '250ms',
        'fast': '150ms',
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
