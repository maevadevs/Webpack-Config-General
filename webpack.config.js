/**
 * This is the configuration file for Webpack.
 * Each settings are distributed in separate files under webpack.config.parts
 */

// DEPENDENCIES
// ************

// Required at the very entrance to get the env variables
require('dotenv').config()
// Helper Functions
const { isProduction } = require('./webpack.config.parts/helper-functions')
// Webpack Config Parts
const { entry, output } = require('./webpack.config.parts/entry-output')
const { webpackModule } = require('./webpack.config.parts/module-loaders')
const { resolve } = require('./webpack.config.parts/resolve')
const { plugins } = require('./webpack.config.parts/plugins')
const { optimization } = require('./webpack.config.parts/optimization')
const { devServer } = require('./webpack.config.parts/webpack-dev-server')

// EXPORT CONFIG
// *************
// 'process.env' is automatically passed to the function during the build call
// Any other arguments during the call is passed under 'argv'

module.exports = (env, argv) => ({
  mode: env,
  entry,
  output,
  plugins,
  module: webpackModule(env),
  resolve,
  optimization: isProduction(env) ? optimization : {},
  devServer: isProduction(env) ? {} : devServer,
  devtool: isProduction(env) ? false : 'cheal-module-eval-source-map'
})
