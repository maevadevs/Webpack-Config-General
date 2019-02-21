/**
 * Optimizations are applied on production mode only:
 * - UglifyWebpackPlugin: Optimize and minify JS
 * - splitChunks: Split vendor bundles into a separate bundle
 */

// DEPENDENCIES
// ************

const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin')

// OPTIMIZATION FOR PRODUCTION
// ***************************

// JS Optimizer/Minifier
const uglifyWebpackPlugin = new UglifyWebpackPlugin({
  uglifyOptions: {
    compress: {
      drop_console: true // remove all console.log()
    },
    output: {
      comments: false // remove all comments
    }
  }
})

// Combine all now
const setupOptimization = () => ({
  // Minimize/Optimize JS
  minimizer: [uglifyWebpackPlugin],
  // Bundle splitting: To extract a separate vendor bundle from node_modules
  splitChunks: {
    cacheGroups: {
      commons: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'initial'
      }
    }
  },
  // Extract bundle manifest
  runtimeChunk: { name: 'manifest' }
})

// EXPORTS
// *******

module.exports = { setupOptimization }
