/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
	  extend: {
		fontFamily: {
		  sans: ['Roboto', 'sans-serif'],
		  serif: ['Merriweather', 'serif'],
		  display: ['Poppins', 'sans-serif'],
		},
		colors: {
		  primary: {
			50: '#e6f1ff',
			100: '#cce3ff',
			200: '#99c7ff',
			300: '#66aaff',
			400: '#338eff',
			500: '#0072ff',
			600: '#005bcc',
			700: '#004499',
			800: '#002e66',
			900: '#001733',
		  },
		  secondary: {
			50: '#fff0f3',
			100: '#ffe0e6',
			200: '#ffc2cd',
			300: '#ffa3b4',
			400: '#ff859b',
			500: '#ff6682',
			600: '#cc5268',
			700: '#993d4e',
			800: '#662934',
			900: '#33141a',
		  },
		  neutral: {
			50: '#f8fafc',
			100: '#f1f5f9',
			200: '#e2e8f0',
			300: '#cbd5e1',
			400: '#94a3b8',
			500: '#64748b',
			600: '#475569',
			700: '#334155',
			800: '#1e293b',
			900: '#0f172a',
		  },
		},
	  },
	  container: {
		center: true,
		padding: {
		  DEFAULT: '1rem',
		  sm: '2rem',
		  lg: '4rem',
		  xl: '5rem',
		  '2xl': '6rem',
		},
	  },
	},
	plugins: [],
  };