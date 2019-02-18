# `webpack-config-general`

This is a generalized Webpack configuration for React development and production use. It can also be extended to be used for other non-React projects. The only difference will be in finding an alternative for `@babel/preset-react` to process the source files.

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
- JS: `.js`, `.mjs`, `.jsx` bundling
- BROWSER SUPPORT: Using `autoprefixer` with settings defined in `/.browserslistrc`
- IMAGES: Support sprites for SCSS and image compression for production
- FONTS: Support fonts file packaging
- REACT: Use of React and JSX for component definitions

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
