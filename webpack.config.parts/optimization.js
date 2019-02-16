/**
 * - OptimizeCSSAssetsPlugin: Optimize and minify CSS (Production only)
 */

// DEPENDENCIES
// ************

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

// OPTIMIZATION FOR PRODUCTION
// ***************************

const optimize = {
  minimizer: [new OptimizeCSSAssetsPlugin({})]
}

// EXPORTS
// *******

module.exports = { optimize }
