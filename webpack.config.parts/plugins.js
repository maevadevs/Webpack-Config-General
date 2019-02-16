/**
 * - HtmlWebpackPlugin: Generate the static HTML contents from template
 * - PurgecssPlugin: Purge unused CSS styles of external framework (Production only)
 */

// DEPENDENCIES
// ************

const { join } = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')

// PLUGINS
// *******

const plugins = [
  // Auto-generate index.html
  new HtmlWebpackPlugin({
    title: 'Webpack Demo',
    template: 'src/templates/index.html'
  }),
  // Extract CSS to separate file for production mode: [name] is 'entry'
  new MiniCssExtractPlugin({ 
    filename: '[name].css' 
  }),
  // Purge unused CSS: Must be used AFTER MiniCssExtractPlugin. CSS-Mapping is lost. Used in production only.
  new PurgecssPlugin({
    // '..' must be added because we __dirname is webpack.config.parts
    paths: glob.sync(`${join(__dirname, '..', 'src')}/**/*`,  { 
      nodir: true 
    }),
  })
]

// EXPORTS
// *******

module.exports = { plugins }
