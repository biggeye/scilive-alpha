const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: {
    'postcss-nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? {
      '@fullhuman/postcss-purgecss': purgecss({
        content: ['./**/*.html'],
        // Add other purgecss options here if needed
      })
    } : {})
  }
};
