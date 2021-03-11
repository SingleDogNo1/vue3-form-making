module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      border: '#e0e0e0',
      background: '#f4f6fc',
      placeholder: '#cccccc'
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
