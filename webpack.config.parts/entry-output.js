/**
 * - Entry: The entrypoint of the graph for resolving dependencies
 * - Output: The output folder and file name of the bundle
 */

// DEPENDENCIES
// ************

const { join } = require('path')

// ENTRY / OUTPUT
// **************

const entry = { 
  index: './src/index.js' 
}
const output = {
  filename: 'bundle.js',
  path: join(__dirname, '..', 'dist') // Relative to this file
}

// EXPORTS
// *******

module.exports = { entry, output }
