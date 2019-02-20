/**
 * This is the configuration file for Webpack.
 * Each settings are distributed in separate files under webpack.config.parts
 */

// DEPENDENCIES
// ************

// Required at the very entrance to get the env variables
require('dotenv').config()
const { join } = require('path')
// Helper Functions
const { isProduction } = require('./webpack.config.parts/helper-functions')
// Webpack Config Parts
const { setupEntry, setupOutput } = require('./webpack.config.parts/entry-output')
const { setupModule } = require('./webpack.config.parts/module-loaders')
const { setupResolve } = require('./webpack.config.parts/resolve')
const { setupPlugins } = require('./webpack.config.parts/plugins')
const { setupOptimization } = require('./webpack.config.parts/optimization')
const { setupDevServer } = require('./webpack.config.parts/webpack-dev-server')

// PATHS
// *****

// Paths are mostly relative to this file, thus __dirname here
const paths = {
  src: join(__dirname, 'src'),
  dist: join(__dirname, 'dist')
}

// EXPORT CONFIG
// *************
// 'process.env' is automatically passed to the function during the build call
// Any other arguments during the call is passed under 'argv'

module.exports = (env, argv) => ({
  mode: env,
  entry: setupEntry(paths),
  output: setupOutput(paths),
  plugins: setupPlugins(paths),
  module: setupModule(env),
  resolve: setupResolve(),
  optimization: isProduction(env) ? setupOptimization() : {},
  devServer: isProduction(env) ? {} : setupDevServer(paths),
  devtool: isProduction(env) ? false : 'cheal-module-eval-source-map'
})
