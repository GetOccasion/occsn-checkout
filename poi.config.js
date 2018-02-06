const pkg = require('./package.json');

module.exports = {
  // Entry is relative to process.cwd()
  entry: [
    'index.jsx',
  ],

  dist: 'lib/assets',

  presets: [
    require('poi-preset-react')()
  ],

  filename: {
    js: 'javascripts/' + pkg.name + '-[name]_bundle.js',
    css: 'stylesheets/' + pkg.name + '-[name]_bundle.css',
    images: 'images/[name].[ext]',
    fonts: 'fonts/[name].[ext]',
  }
};
