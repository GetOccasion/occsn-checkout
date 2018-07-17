const pkg = require('./package.json');
const path = require('path');
const process = require('process');

module.exports = {
  // Entry is relative to process.cwd()
  entry: {
    client: 'app/startup/app.jsx'
  },

  html: {
    template: 'index.html'
  },

  outDir: 'lib/assets',

  plugins: [
    require('poi-plugin-react')(),
    require('poi-plugin-resolve-alias')({
      'active-resource': path.join(process.cwd(), 'node_modules', 'active-resource', 'build', 'active-resource.js'),
      'mitragyna': path.join(process.cwd(), 'node_modules', 'mitragyna', 'build', 'mitragyna.min.js'),
      'occasion-sdk': path.join(process.cwd(), 'node_modules', 'occasion-sdk', 'build', 'occasion-sdk.js'),
    })
  ],

  filename: {
    js: 'javascripts/' + pkg.name + '-[name]_bundle.js',
    chunk: 'javascripts/' + pkg.name + '-[name]_bundle.js',
    css: 'stylesheets/' + pkg.name + '-[name]_bundle.css',
    images: 'images/[name].[ext]',
    fonts: 'fonts/[name].[ext]',
  },

  configureWebpack(config) {
    config.externals = {
      spreedly: 'Spreedly',
      square: 'SqPaymentForm',
    };

    return config;
  }
};
