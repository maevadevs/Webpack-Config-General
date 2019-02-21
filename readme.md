# `webpack-config-general`

This is a generalized Webpack configuration for React development and production use. It can also be extended to be used for other non-React projects. The only difference will be in finding an alternative for `@babel/preset-react` to process the source files.

## Installation

- Clone from this Github repo
- All front-end files and folders should go under `/src`
- All front-end production build output will be generated in `/dist`
- Backend for demo is currently defined under `server.js`: Change `package.json` scripts if customizing

## Structure

- `/src`: All source files for application build
  - `/components`: All React Components sources, logic and styles.
  - `/fonts`: All fonts sources. Supporting `eot`, `ttf`, `woff`, and `woff2` formats
  - `/images`: All source images
    - `/to-sprites`: All small images such as icons will be converted into sprites
  - `/templates`: All HTML templates. For SPA, this might only contain `index.html`
- `/dist`: All build files for production use
- `/webpack.config.parts`: All parts of the `webpack.config.js` broken down by file. All parts are combined to create `webpack.config.js`
- `/server.js`: Simple server file for the demo
- `/.browserslistrc`: List of browsers to support using `autoprefixer`
- `/.env`: All environment variables (Not part of the repo. Create one for your own project.)

## Defined Settings

- MODES: `development` and `production` mode choices
- HTML: `index.html` templating and auto-generation
- STYLES: `.sass`, `.scss`, `.css` bundling and optimizations
- JS: `.js`, `.mjs`, `.jsx` bundling and optimization
- BROWSER SUPPORT: Using `autoprefixer` with settings defined in `/.browserslistrc`
- IMAGES:
  - Support sprites for SCSS and image compression for production
  - Lossless picture compression
- FONTS: Support fonts file packaging
- REACT: Use of React and JSX for component definitions
- FOLDER: Automatically clean up the `dist` folder before each `yarn build`

## Available Scripts

### `yarn start`

Start a simple test production server

- Starting a live server on `process.env.PORT`: `8000` by default

### `yarn dev`

Run Webpack with development configurations.

- Running `webpack-dev-server` in development mode
  - Webpack `mode`: `development`
  - Running in watch-mode
  - Using DevTools
  - SCSS/CSS:
    - Using `style-loader`
    - Using SourceMaps
  - IMAGES: No compressions
- No output files: All outputs in memory with `webpack-dev-server`
- Starting a live server on `127.0.0.1:8080`

### `yarn build`

Run Webpack with production configurations and generate `dist`.

- Running `webpack.config.js` in production mode
  - Webpack `mode`: `production`
  - Running once only
  - Removing all DevTools
  - SCSS/CSS:
    - Using `MiniCssExtractPlugin`, `OptimizeCSSAssetsPlugin`, `PurgecssPlugin`, and `uglifyWebpackPlugin`
    - Removing all `console.log()`
    - Removing all SourceMaps
  - IMAGES: Apply lossless compression using `imagemin-webpack`
- Producing all output files under `/dist` folder: Autoclean previous `/dist` first

### `yarn build:run`

Run `yarn build` and `yarn start`

### `yarn build:stats`

Run `yarn build` with all profile and progress details

- Generate `build-stats.json`

### `yarn build:perf`

Run `yarn build` in a production-debug mode with `yarn start`

- Use this for checking build performance and build Analysis
- Enable `BundleAnalyzerPlugin` on `127.0.0.1:8888`
- Enable `duplicatePackageCheckerPlugin`
