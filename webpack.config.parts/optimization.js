/**
 * Optimizations are applied for production mode only:
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

// SplitChuncks: Bundle splitting: To extract a separate vendor bundle from node_modules
const splitChunks = {
  cacheGroups: {
    commons: {
      test: /[\\/]node_modules[\\/]/,
      name: 'vendors',
      chunks: 'initial'
    }
  }
}

// runtimeChunck: Extract bundle manifest: Used for client-level caching
const runtimeChunk = { name: 'manifest' }

// Combine all now
const setupOptimization = () => ({
  minimizer: [uglifyWebpackPlugin],
  splitChunks,
  runtimeChunk
})

// EXPORTS
// *******

module.exports = { setupOptimization }
