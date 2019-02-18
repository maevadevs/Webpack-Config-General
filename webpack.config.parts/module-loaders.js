/**
 * - MiniCssExtractPlugin: Extract CSS generated from SCSS files into separate file 
 *   - This is for production only
 *   - For development: We only use style-loader
 * - Autoprefixer: Automatically prefix some CSS rules for browser compatibility
 *   - Used with postcss-loader and glob
 */

// DEPENDENCIES
// ************

const { join } = require('path')
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
      presets: [
        '@babel/preset-env', // Browser argets specified in .browserslitsrc
        '@babel/preset-react'
      ]
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

// Images loaders Rules
// Use file-loader for all images: Output files in /dist
const getImagesLoadersRules = env => ({
  test: /\.(bmp|gif|jpe?g|png|svg|tif?f)$/,
  use: [{
    loader: 'file-loader',
    options: {
      name: `images/[name].[hash].[ext]`
    }
  }, {
    // For compressing pictures: Should be applied first
    loader: 'image-webpack-loader',
    options: {
      disable: !isProduction(env), // Only enable when in production
    }
  }]
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
