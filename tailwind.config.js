module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      border: '#e0e0e0',
      background: '#F4F6FC'
    },
    widgetMenu: {
      height: '26px'
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
}
