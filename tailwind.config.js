module.exports = {
    content: ['./layouts/**/*.html', './content/**/*.md'],
    theme: {
      extend: {},
    },
    variants: {},
    plugins: [
      require('@tailwindcss/typography'),
    ],
  }