// DEPENDENCIES
// ************

require('dotenv').config()
const { join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const glob = require('glob')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const Autoprefixer = require('autoprefixer')

const { WDS_HOST, WDS_PORT } = process.env

// HELPER FUNCTIONS
// ****************

const isProduction = env => env === 'production'

// WEBPACK CONFIG
// **************

// --- ENTRY / OUTPUT ---
// **********************

const entry = { 
  index: './src/index.js' 
}
const output = {
  filename: 'bundle.js',
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
  // Extract CSS to separate file for production mode: main.css
  new MiniCssExtractPlugin({ filename: '[name].css' }),
  // Purge unused CSS: Must be used AFTER MiniCssExtractPlugin. CSS-Mapping is lost
  new PurgecssPlugin({
    paths: glob.sync(`${join(__dirname, 'src')}/**/*`,  { nodir: true }),
  })
]

// --- LOADERS ---
// ***************

const wbpModule = (env) => ({
  rules: [{ 
    test: /\.(s)?css$|\.sass$/, // Handle CSS, SASS, and SCSS files
    exclude: [/node_modules/], // Must be a RegExp
    use: [{
      loader: isProduction(env) ? MiniCssExtractPlugin.loader : 'style-loader', // Extract CSS to separate file: main.css
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
        plugins: () => [Autoprefixer()],
      },
    }, { 
      loader: 'sass-loader',
      options: { 
        sourceMap: isProduction(env) ? false : true
      }
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
  optimization: isProduction(env) ? optimization : {},
  devServer: isProduction(env) ? {} : devServer,
  devtool: isProduction(env) ? false : 'cheal-module-eval-source-map'
})
