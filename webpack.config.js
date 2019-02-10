require('dotenv').config()
const { join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    main: './src/index.js'
  }, 
  output: {
    filename: 'main.js',
    path: join(__dirname, 'dist')
  },
  plugins: [
    // Auto-generate index.html
    new HtmlWebpackPlugin({
      title: 'Webpack Demo',
    }),
  ],
  // Settings for webpack-dev-server
  devServer: {
    host: process.env.WDS_HOST, // Defaults to `localhost`
    port: process.env.WDS_PORT, // Defaults to 8080
    open: false, // Automatically open the page in browser
    historyApiFallback: true, // Using HTML5 History API based routing
    overlay: true, // Error overlay to capture compilation related warnings and errors
    contentBase: join(__dirname, 'dist') // Contents not passing through webpack are served directly from this folder
  }
} 
