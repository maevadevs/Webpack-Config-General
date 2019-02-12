// DEPENDENCIES
// ************

require('dotenv').config()
const { join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin  =require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const glob = require('glob')
const PurgecssPlugin = require('purgecss-webpack-plugin')

const { WDS_HOST, WDS_PORT } = process.env

// WEBPACK CONFIG
// **************

// --- ENTRY / OUTPUT ---
// **********************

const entry = { 
  main: './src/index.js' 
}
const output = {
  filename: 'main.js',
  path: join(__dirname, 'dist')
}

// --- PLUGINS ---
// ***************

const plugins = [
  // Auto-generate index.html
  new HtmlWebpackPlugin({
    title: 'Webpack Demo',
    template: 'src/templates/index.html'
  }),
  // Extract CSS to separate file: main.css
  new MiniCssExtractPlugin(),
  // Purge unused CSS
  new PurgecssPlugin({
    paths: glob.sync(`${join(__dirname, 'src')}/**/*`,  { nodir: true }),
  })
]

// --- LOADERS ---
// ***************

const wbpModule = env => ({
  rules: [{ 
    test: /\.(s)?css$|\.sass$/, // Handle CSS, SASS, and SCSS files
    // include: [], // Must be a RegExp
    exclude: [/node_modules/], // Must be a RegExp
    use: [{ 
      loader: MiniCssExtractPlugin.loader // Extract CSS to separate file: main.css
    }, { 
      loader: 'css-loader',
      options: { sourceMap: env === 'production' ? false : true }
    }, { 
      loader: 'sass-loader',
      options: { sourceMap: env === 'production' ? false : true }
     }]
  }]
})

// --- WEBPACK-DEV-SERVER ---
// **************************

const devServer = {
  host: WDS_HOST, // Default: `localhost`
  port: WDS_PORT, // Default: 8080
  open: false, // Automatically open the page in browser
  historyApiFallback: true, // Using HTML5 History API based routing
  overlay: true, // Error overlay to capture compilation related warnings and errors
  contentBase: join(__dirname, 'dist') // Contents not passing through webpack are served directly from this folder
  // proxy: { "/api": "http://my.api/endpoint" } // If using multiple servers, proxy WDS to them
  // header: // Attach custom headers to your requests here
}

// --- OPTIMIZATIONS FOR PRODUCTION ---
// ************************************

const optimization = {
  splitChunks: {
    cacheGroups: {
      styles: {
        name: 'styles',
        test: /\.css$/,
        chunks: 'all',
        enforce: true
      }
    }
  },
  minimizer: [new OptimizeCSSAssetsPlugin({})]
}

// EXPORT CONFIG
// *************
// 'process.env' is passed to the function during the build call
// Any other arguments during the call is passed as argv

module.exports = (env, argv) => ({
  mode: env,
  entry, 
  output,
  plugins,
  module: wbpModule(env),
  optimization: env === 'production' ? optimization : {},
  devServer: env === 'production' ? {} : devServer
})
