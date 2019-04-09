module.exports = {
  presets: [
    [
      "@babel/env",
      {
        modules: false
      }
    ],
    "@babel/react"
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    "transform-optional-chaining"
  ]
}
