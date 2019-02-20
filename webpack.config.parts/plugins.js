/**
 * - HtmlWebpackPlugin: Generate the static HTML contents from template
 * - PurgecssPlugin: Purge unused CSS styles of external framework (Production only)
 * - SpritesmithPlugin: Setup sprites images
 */

// DEPENDENCIES
// ************

const { join, resolve } = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const SpritesmithPlugin = require('webpack-spritesmith')
const CleanWebpackPlugin = require('clean-webpack-plugin')

// PLUGINS
// *******

const setupPlugins = paths => ([
  // Auto-generate index.html
  new HtmlWebpackPlugin({
    title: 'Webpack Demo',
    template: join(paths.src, 'templates', 'index.html')
  }),
  // Extract CSS to separate file for production mode: [name] is 'entry'
  new MiniCssExtractPlugin({
    filename: '[name].css'
  }),
  // Purge unused CSS: Must be used AFTER MiniCssExtractPlugin. CSS-Mapping is lost. Used in production only.
  new PurgecssPlugin({
    // '..' must be added because __dirname is webpack.config.parts
    // paths: glob.sync(`${join(__dirname, '..', 'src')}/**/*`, {
    paths: glob.sync(`${paths.src}/**/*`, {
      nodir: true
    })
  }),
  // Setup sprites for any images contained in images/to-sprites
  // The name of the image will become an scss variable to be used
  new SpritesmithPlugin({
    src: {
      cwd: resolve(paths.src, 'images', 'to-sprites'),
      glob: '*.png'
    },
    target: {
      image: resolve(paths.src, 'sprites-generated', 'sprite.png'),
      css: resolve(paths.src, 'sprites-generated', 'sprite.scss')
    },
    apiOptions: {
      cssImageRef: '~sprite.png'
    }
  }),
  // Clean the build directory before each build
  new CleanWebpackPlugin([])
])

// EXPORTS
// *******

module.exports = { setupPlugins }
