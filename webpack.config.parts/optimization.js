/**
 * Optimizations are applied on production mode only:
 * - OptimizeCSSAssetsPlugin: Optimize and minify CSS
 * - UglifyWebpackPlugin: Optimize and minify JS
 * - splitChunks: Split vendor bundles into a separate bundle
 */

// DEPENDENCIES
// ************

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin')

// OPTIMIZATION FOR PRODUCTION
// ***************************

// CSS Optimizer/Minifier
const optimizeCSSAssetsPlugin = new OptimizeCSSAssetsPlugin({})

// JS Optimizer/Minifier
const uglifyWebpackPlugin = new UglifyWebpackPlugin({
  uglifyOptions: {
    compress: {
      drop_console: true // remove all console.log()
    }
  }
})

// Combine all now
const setupOptimization = () => ({
  // Minimize/Optimize CSS and JS
  minimizer: [optimizeCSSAssetsPlugin, uglifyWebpackPlugin],
  // Bundle splitting: To extract a separate vendor bundle from node_modules
  splitChunks: {
    cacheGroups: {
      commons: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'initial'
      }
    }
  }
})

// EXPORTS
// *******

module.exports = { setupOptimization }
