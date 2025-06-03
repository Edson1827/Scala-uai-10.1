module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#6C3B9F',
        'primary-light': '#8A5CB8',
        'primary-dark': '#502D78',
        secondary: '#D1C4E9',
        'secondary-light': '#E4DCF2',
        'secondary-dark': '#B39DDB',
        accent: '#00C48C',
        'accent-light': '#33D1A0',
        'accent-dark': '#00A371',
        darkbg: '#1E1E2F',
        'darkbg-light': '#2D2D3E',
        'darkbg-dark': '#121220',
        textmain: '#333333',
        'text-secondary': '#666666',
        'text-tertiary': '#999999',
        success: '#4CAF50',
        warning: '#FFC107',
        error: '#F44336',
        info: '#2196F3',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
        'slide-down': 'slideDown 0.5s ease-in-out',
        'slide-in-right': 'slideInRight 0.5s ease-in-out',
        'slide-in-left': 'slideInLeft 0.5s ease-in-out',
        'bounce-in': 'bounceIn 0.8s ease-in-out',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'button': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'button-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        '128': '32rem',
      },
      gradients: {
        'primary': 'linear-gradient(135deg, #6C3B9F 0%, #8A5CB8 100%)',
        'accent': 'linear-gradient(135deg, #00C48C 0%, #33D1A0 100%)',
        'dark': 'linear-gradient(135deg, #1E1E2F 0%, #2D2D3E 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
