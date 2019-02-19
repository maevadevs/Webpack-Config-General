/**
 * - OptimizeCSSAssetsPlugin: Optimize and minify CSS (Production only)
 */

// DEPENDENCIES
// ************

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

// OPTIMIZATION FOR PRODUCTION
// ***************************

const optimize = {
  minimizer: [new OptimizeCSSAssetsPlugin({})],
  splitChunks: { chunks: 'initial' }  // Bundle splitting: To extract a separate vendor bundle from the node_modules
}

// EXPORTS
// *******

module.exports = { optimize }
