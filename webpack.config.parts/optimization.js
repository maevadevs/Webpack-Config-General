/**
 * - OptimizeCSSAssetsPlugin: Optimize and minify CSS (Production only)
 */

// DEPENDENCIES
// ************

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

// OPTIMIZATION FOR PRODUCTION
// ***************************

const optimize = {
  // Minimize/Optimize CSS
  minimizer: [new OptimizeCSSAssetsPlugin({})],
  // Bundle splitting: To extract a separate vendor bundle from the node_modules
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

module.exports = { optimize }
