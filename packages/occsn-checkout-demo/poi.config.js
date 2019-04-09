const pkg = require('./package.json');
const path = require('path');
const process = require('process');

module.exports = {
  // Entry is relative to process.cwd()
  entry: {
    client: 'src/startup.jsx'
  },

  html: {
    template: 'index.html'
  },

  plugins: [
    require('poi-plugin-react')()
  ]
};
