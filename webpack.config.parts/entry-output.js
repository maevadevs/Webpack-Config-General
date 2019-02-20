/**
 * - Entry: The entrypoint of the graph for resolving dependencies
 * - Output: The output folder and file name of the bundle
 */

// ENTRY / OUTPUT
// **************

const setupEntry = () => ({
  index: './src/index.js'
})
const setupOutput = paths => ({
  filename: 'bundle.js',
  path: paths.dist
})

// EXPORTS
// *******

module.exports = { setupEntry, setupOutput }
