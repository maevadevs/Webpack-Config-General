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
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const Jarvis = require('webpack-jarvis')
const { DuplicatesPlugin } = require('inspectpack/plugin')
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
const { isProduction, isProductionDebug } = require('./helper-functions')

// PLUGINS
// *******

// --- ALWAYS-ON PLUGINS ---
// *************************

// Auto-generate index.html
const htmlWebpackPlugin = paths => (new HtmlWebpackPlugin({
  title: 'Webpack Demo',
  template: join(paths.src, 'templates', 'index.html')
}))
// Extract CSS to separate file for production mode: [name] is 'entry'
const miniCssExtractPlugin = () => (new MiniCssExtractPlugin({
  filename: 'styles.[contenthash].css' // Don't use chunkhash with CSS
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

// --- PRODUCTION-ONLY PLUGINS ---
// *******************************

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
// Clean the build directory before each build
const cleanWebpackPlugin = paths => (new CleanWebpackPlugin([paths.dist], {
  root: paths.root,
  verbose: true,
  dry: false
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

// --- PRODUCTION-DEBUG-ONLY PLUGINS ---
// *************************************

// Check if packages of different versions are present in the project
const duplicatePackageCheckerPlugin = () => (new DuplicatePackageCheckerPlugin({
  verbose: true // Also show module that is requiring each duplicate package
}))
// Create an interactive treemap visualization of the contents of all your bundles: port 8888
const bundleAnalyzerPlugin = () => (new BundleAnalyzerPlugin())
// Put in your browser all the relevant information you need from your webpack build whether in dev or in prod
const jarvis = () => (new Jarvis({
  port: 1337 // optional: set a port
}))
// Identifies unnecessarily duplicated code in webpack bundles
const duplicatesPlugin = () => (new DuplicatesPlugin({
  // Emit compilation warning or error? (Default: `false`)
  emitErrors: false,
  // Handle all messages with handler function (`(report: string)`)
  // Overrides `emitErrors` output.
  emitHandler: undefined,
  // Display full duplicates information? (Default: `false`)
  verbose: false
}))

// --- COMBINE ALL PLUGINS: FINAL SETUP ---
// ****************************************

const setupPlugins = (env, paths) => ([
  // Always-on Plugins
  htmlWebpackPlugin(paths),
  miniCssExtractPlugin(),
  spritesmithPlugin(paths),
  // Production-Only Plugins
  isProduction(env) ? imageMinPlugin() : { apply: () => {} }, // production only // Make sure that the plugin is after any plugins that add images, example `CopyWebpackPlugin`
  isProduction(env) ? cleanWebpackPlugin(paths) : { apply: () => {} },
  isProduction(env) ? purgecssPlugin(paths) : { apply: () => {} },
  isProduction(env) ? optimizeCSSAssetsWebpackPlugin() : { apply: () => {} },
  // Production-Debug-only Plugins
  // isProductionDebug(env) ? jarvis() : { apply: () => {} }, // production in debug mode only
  isProductionDebug(env) ? duplicatePackageCheckerPlugin() : { apply: () => {} }, // production in debug mode only
  isProductionDebug(env) ? bundleAnalyzerPlugin() : { apply: () => {} }, // production in debug mode only
  isProductionDebug(env) ? duplicatesPlugin() : { apply: () => {} } // production in debug mode only
])

// EXPORTS
// *******

module.exports = { setupPlugins }
