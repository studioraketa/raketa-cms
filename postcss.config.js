const autoprefixer = require('autoprefixer');
const vars = require('postcss-modules-values');

module.exports = {
  plugins: [
    autoprefixer({
      browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']
    }),
    vars
  ]
}
