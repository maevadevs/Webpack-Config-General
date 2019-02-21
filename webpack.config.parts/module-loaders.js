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
const { join } = require('path')

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
        '@babel/preset-env', // Browser targets specified in .browserslitsrc
        '@babel/preset-react'
      ],
      plugins: [
        '@babel/plugin-syntax-dynamic-import'
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
      sourceMap: !isProduction(env)
    }
  }, {
    loader: 'css-loader',
    options: {
      sourceMap: !isProduction(env)
    }
  }, {
    loader: 'sass-loader',
    options: {
      sourceMap: !isProduction(env)
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
      name: join('images', '[name].[hash].[ext]')
    }
  }, {
    // For compressing pictures: Should be applied first
    loader: 'image-webpack-loader',
    options: {
      disable: !isProduction(env) // Only enable when in production
    }
  }]
})

// Font loaders Rules
// Use file-loader for all fonts: Output files in /dist
const getFontLoadersRules = () => ({
  test: /\.(ttf|eot|woff|woff2)$/,
  use: [{
    loader: 'file-loader',
    options: {
      name: join('fonts', '[name].[hash].[ext]')
    }
  }]
})

// Aggregate all Loader Rules under Webpack's "rules" setting
const setupModule = env => ({
  rules: [
    getBabelLoaderRules(),
    getAllStyleLoadersRules(env),
    getImagesLoadersRules(),
    getFontLoadersRules()
  ]
})

// EXPORTS
// *******

module.exports = { setupModule }
