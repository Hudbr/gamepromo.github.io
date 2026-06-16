module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        accent: '#00b3ff',
        accent2: '#0ff0d8',
        surface: '#0f1113'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
}
