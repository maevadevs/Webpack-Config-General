# `Webpack-config-general`

This is a generalized Webpack configuration for development and production use. Settings defined for:

- HTML: `index.html` templating and auto-generation
- STYLES: `.sass`, `.scss`, `.css` bundling and optimizations
- JS: `.js`, `.mjs`, `.jsx` bundling
- MODES: `development` and `production` mode settings
- BROWSER SUPPORT: Using `autoprefixer` with settings in `.browserslistrc`
- IMAGES: Support sprites for SCSS and image compression for production
- REACT: Use of React and JSX for component definition

## Installation

- Clone from this Github repo
- All front-end files and folders should go under `/src`
- All front-end production build output will be generated in `/dist`
- Backend is currently defined under `server.js`: Change `package.json` scripts if customizing

## Available Scripts

### - `yarn dev`

Run Webpack with development configurations.

- Run `webpack-dev-server` in development mode
  - Webpack `mode`: `development`
  - Run in watch-mode
  - Use DevTools
  - SCSS/CSS:
    - Use `style-loader`
    - Use SourceMaps
- No output files: All outputs in memory with `webpack-dev-server`
- Start a live server on `127.0.0.1:8080`

### - `yarn build`

Run Webpack with production configurations.

- Run `webpack.config.js` in production mode
  - Webpack `mode`: `production`
  - Run once only
  - Remove all DevTools
  - SCSS/CSS:
    - Use `MiniCssExtractPlugin`, `OptimizeCSSAssetsPlugin`, and `PurgecssPlugin`
    - Remove all SourceMaps
- Produce all output files under `/dist` folder
- Start a live server on `process.env.PORT`: `8000` by default
