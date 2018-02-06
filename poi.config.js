module.exports = {
  // Entry is relative to process.cwd()
  entry: [
    'index.jsx',
  ],

  dist: 'dist',

  presets: [
    require('poi-preset-react')()
  ]
};
