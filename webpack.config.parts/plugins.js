/**
 * - HtmlWebpackPlugin: Generate the static HTML contents from template
 * - PurgecssPlugin: Purge unused CSS styles of external framework (Production only)
 * - SpritesmithPlugin: Setup sprites images
 */

// DEPENDENCIES
// ************

const { join, resolve } = require('path')
const glob = require('glob')
const cssnano = require('cssnano')

const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const SpritesmithPlugin = require('webpack-spritesmith')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// Helper Functions
const { isProduction } = require('./helper-functions')

// PLUGINS
// *******

// Clean the build directory before each build
const cleanWebpackPlugin = paths => (new CleanWebpackPlugin([paths.dist], {
  root: paths.root,
  verbose: true,
  dry: false
}))
// Auto-generate index.html
const htmlWebpackPlugin = paths => (new HtmlWebpackPlugin({
  title: 'Webpack Demo',
  template: join(paths.src, 'templates', 'index.html')
}))
// Extract CSS to separate file for production mode: [name] is 'entry'
const miniCssExtractPlugin = () => (new MiniCssExtractPlugin({
  filename: '[name].css'
}))
// Purge unused CSS: Must be used AFTER MiniCssExtractPlugin. CSS-Mapping is lost.
const purgecssPlugin = paths => (new PurgecssPlugin({
  paths: glob.sync(`${paths.src}/**/*`, {
    nodir: true
  })
}))
// Optimize and Minify CSS
const optimizeCSSAssetsWebpackPlugin = () => new OptimizeCSSAssetsWebpackPlugin({
  canPrint: false, // if the plugin can print messages to the console
  cssProcessor: cssnano,
  cssProcessorOptions: {
    discardComments: { removeAll: true },
    safe: true, // Run cssnano in safe mode to avoid potentially unsafe transformations
    autoprefixer: false
  }
})
// Setup sprites for any images contained in images/to-sprites
// The name of the image will become an scss variable to be used
const spritesmithPlugin = paths => (new SpritesmithPlugin({
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
}))

// Combine all plugins instances
const setupPlugins = (env, paths) => ([
  isProduction(env) ? cleanWebpackPlugin(paths) : { apply: () => {} }, // production only
  htmlWebpackPlugin(paths),
  miniCssExtractPlugin(),
  isProduction(env) ? optimizeCSSAssetsWebpackPlugin() : { apply: () => {} }, // production only
  isProduction(env) ? purgecssPlugin(paths) : { apply: () => {} }, // production only
  spritesmithPlugin(paths)
])

// EXPORTS
// *******

module.exports = { setupPlugins }
