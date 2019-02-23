/**
 * - MiniCssExtractPlugin: Extract CSS generated from SCSS files into separate file
 *   - This is for production only
 *   - For development: We only use style-loader
 */

// DEPENDENCIES
// ************

const { join } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { isProduction } = require('./helper-functions')

// MODULE / LOADERS
// ****************

// Babel Loader Rules: JS, JSX and MJS files
const getBabelLoaderRules = () => ({
  test: /\.m?jsx?$/,
  exclude: [/(node_modules)/],
  use: [{
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: ['@babel/plugin-syntax-dynamic-import']
    }
  }]
})

// Style loaders Rules
// Handle CSS, SASS, and SCSS files
const getAllStyleLoadersRules = env => ({
  test: [/\.s?css$/, /\.sass$/],
  exclude: [/node_modules/],
  use: [{
    loader: MiniCssExtractPlugin.loader,
    options: { sourceMap: !isProduction(env) }
  }, {
    loader: 'css-loader',
    options: { sourceMap: !isProduction(env) }
  }, {
    loader: 'sass-loader',
    options: { sourceMap: !isProduction(env) }
  }]
})

// Images loaders Rules
// Use file-loader for all images: Output files in /dist
const getImagesLoadersRules = env => ({
  test: /\.(bmp|gif|jpe?g|png|svg|tif?f)$/,
  use: [{
    loader: 'file-loader',
    options: {
      name: isProduction(env) ? join('images', '[name].[hash].[ext]') : join('images', '[name].[ext]')
    }
  }, {
    // For compressing pictures: Should be applied first
    loader: 'image-webpack-loader',
    options: {
      // Only enable when in production
      disable: !isProduction(env)
    }
  }]
})

// Font loaders Rules
// Use file-loader for all fonts: Output files in /dist
const getFontLoadersRules = (env) => ({
  test: /\.(ttf|eot|woff|woff2)$/,
  use: [{
    loader: 'file-loader',
    options: {
      name: isProduction(env) ? join('fonts', '[name].[hash].[ext]') : join('fonts', '[name].[ext]')
    }
  }]
})

// Aggregate all Loader Rules under Webpack's "rules" setting
const setupModule = env => ({
  rules: [
    getBabelLoaderRules(),
    getAllStyleLoadersRules(env),
    getImagesLoadersRules(env),
    getFontLoadersRules(env)
  ]
})

// EXPORTS
// *******

module.exports = { setupModule }
