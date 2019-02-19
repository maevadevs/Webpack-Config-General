/**
 * Optimizations are applied on production mode only:
 * - OptimizeCSSAssetsPlugin: Optimize and minify CSS
 * - splitChunks: Split vendor bundles into a separate bundle
 */

// DEPENDENCIES
// ************

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

// OPTIMIZATION FOR PRODUCTION
// ***************************

const optimization = {
  // Minimize/Optimize CSS
  minimizer: [new OptimizeCSSAssetsPlugin({})],
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
}

// EXPORTS
// *******

module.exports = { optimization }
