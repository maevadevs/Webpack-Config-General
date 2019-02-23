/**
 * - Entry: The entrypoint of the graph for resolving dependencies
 * - Output: The output folder and file name of the generated bundles
 */

const { isProduction } = require('./helper-functions')

// ENTRY / OUTPUT
// **************

const setupEntry = () => ({
  index: './src/index.js'
})

const setupOutput = (paths, env) => ({
  // On production, add hash for client-level cache
  filename: isProduction(env) ? 'bundle.[chunkhash].js' : 'bundle.js',
  path: paths.dist
})

// EXPORTS
// *******

module.exports = { setupEntry, setupOutput }
