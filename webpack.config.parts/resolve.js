// DEPENDENCIES
// ************

const { resolve, join } = require('path')

// RESOLVE
// *******
// Configure how modules are resolved.

const setupResolve = paths => ({
  // What directories should be searched when resolving modules: By order of priority
  modules: [
    resolve(join(paths.root, 'src', 'spritesmith-generated')),
    'node_modules'
  ],
  // Allow importing/require without these extensions
  extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.css', '.scss'],
  // Alias of paths for easier import/require statements
  alias: {
    Src: resolve(paths.root, 'src'),
    Components: resolve(join(paths.root, 'src', 'Components')),
    Fonts: resolve(join(paths.root, 'src', 'Fonts')),
    Images: resolve(join(paths.root, 'src', 'Images')),
    Templates: resolve(join(paths.root, 'src', 'Templates'))
  }
})

// EXPORTS
// *******

module.exports = { setupResolve }
