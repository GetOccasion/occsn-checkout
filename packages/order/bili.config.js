var pkg = require('./package.json')

module.exports = {
  input: 'src/index.js',
  format: 'cjs',
  banner: true,
  moduleName: pkg.name,
  inline: false,
  filename: 'index.js'
}
