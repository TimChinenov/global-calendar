module.exports = {
    content: ['./src/**/*.{html,tsx}'],
    theme: {
        fontSize: {
          sm: '0.1rem',
          base: '1rem',
          xl: '1.25rem',
          '2xl': '1.563rem',
          '3xl': '1.953rem',
          '4xl': '2.441rem',
          '5xl': '3.052rem',
        }
    },
    plugins: [
        require('daisyui')
    ]
  }
