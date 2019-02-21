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
const ImageminPlugin = require('imagemin-webpack')
const imageminGifsicle = require('imagemin-gifsicle')
const imageminJpegtran = require('imagemin-jpegtran')
const imageminOptipng = require('imagemin-optipng')
const imageminSvgo = require('imagemin-svgo')
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
const optimizeCSSAssetsWebpackPlugin = () => (new OptimizeCSSAssetsWebpackPlugin({
  canPrint: false, // if the plugin can print messages to the console
  cssProcessor: cssnano,
  cssProcessorOptions: {
    discardComments: { removeAll: true },
    safe: true, // Run cssnano in safe mode to avoid potentially unsafe transformations
    autoprefixer: false
  }
}))
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
// Apply lossless image compression
const imageMinPlugin = () => (new ImageminPlugin({
  bail: false, // Ignore errors on corrupted images
  cache: true,
  imageminOptions: {
    // Lossless optimization with custom option
    plugins: [
      imageminGifsicle({ interlaced: true }),
      imageminJpegtran({ progressive: true }),
      imageminOptipng({ optimizationLevel: 5 }),
      imageminSvgo({ removeViewBox: true })
    ]
  }
}))

// Combine all plugins instances
const setupPlugins = (env, paths) => ([
  isProduction(env) ? cleanWebpackPlugin(paths) : { apply: () => {} }, // production only
  htmlWebpackPlugin(paths),
  miniCssExtractPlugin(),
  isProduction(env) ? purgecssPlugin(paths) : { apply: () => {} }, // production only
  isProduction(env) ? optimizeCSSAssetsWebpackPlugin() : { apply: () => {} }, // production only
  spritesmithPlugin(paths),
  isProduction(env) ? imageMinPlugin() : { apply: () => {} } // production only // Make sure that the plugin is after any plugins that add images, example `CopyWebpackPlugin`
])

// EXPORTS
// *******

module.exports = { setupPlugins }
