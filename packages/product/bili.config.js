import pkg from './package.json'

module.exports = {
  input: 'src/**/*.jsx',
  format: 'cjs',
  banner: true,
  moduleName: pkg.name,
  inline: false,
  filename: 'index.js'
}
