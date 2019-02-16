/**
 * - MiniCssExtractPlugin: Extract CSS generated from SCSS files into separate file 
 *   - This is for production only
 *   - For development: We only use style-loader
 * - Autoprefixer: Automatically prefix some CSS rules for browser compatibility
 *   - Used with postcss-loader and glob
 */

// DEPENDENCIES
// ************

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Autoprefixer = require('autoprefixer')

// Helper Functions
const { isProduction } = require('./helper-functions')

// MODULE / LOADERS
// ****************

// Babel Loader Rules
// Handle JS, JSX and MJS files
const getBabelLoaderRules = () => ({
  test: /\.m?jsx?$/,
  exclude: [/(node_modules)/],
  use: [{
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'] // Targets specified in .browserslitsrc
    }
  }]
})

// Style loaders Rules
// Handle CSS, SASS, and SCSS files
const getAllStyleLoadersRules = env => ({ 
  test: [/\.s?css$/, /\.sass$/],
  exclude: [/node_modules/],
  use: [{
    loader: isProduction(env) ? MiniCssExtractPlugin.loader : 'style-loader',
    options: { 
      sourceMap: isProduction(env) ? false : true
    }
  }, { 
    loader: 'css-loader',
    options: { 
      sourceMap: isProduction(env) ? false : true 
    }
  }, {
    loader: 'postcss-loader',
    options: { 
      plugins: () => [Autoprefixer()] 
    },
  }, { 
    loader: 'sass-loader',
    options: { 
      sourceMap: isProduction(env) ? false : true 
    }
  }]
})

// Small Images loaders Rules
// Use url-loader for small images in development: Inline into bundle.js using base64
// Use file-loader for large images in production: Output files in /dist
// If wanting to generate all image files, defer everything to file-loader only
const getImagesLoadersRules = () => ({
  test: /\.(bmp|gif|jpe?g|png|tif?f)$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 10240, // Limit loading inline file size to 10kB
    },
    fallback: 'file-loader' // Default, but can also be changed
  },
})




// Aggregate all Loader Rules under Webpack's "rules" setting
const webpackModule = env => ({
  rules: [
    getBabelLoaderRules(), 
    getAllStyleLoadersRules(env),
    getImagesLoadersRules()
  ]
})

// EXPORTS
// *******

module.exports = { webpackModule }
