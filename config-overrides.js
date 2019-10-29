const path = require('path')
const {
  override,
  addWebpackAlias,
} = require("customize-cra");

module.exports = override(
  // // enable legacy decorators babel plugin
  // addDecoratorsLegacy(),

  // // disable eslint in webpack
  // disableEsLint(),

  // // add webpack bundle visualizer if BUNDLE_VISUALIZE flag is enabled
  // process.env.BUNDLE_VISUALIZE == 1 && addBundleVisualizer(),

  // add an alias for "ag-grid-react" imports
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
    '@S': path.resolve(__dirname, 'src/styles'),
    '@C': path.resolve(__dirname, 'src/components'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@A': path.resolve(__dirname, 'src/store/actions'),
    '@static': path.resolve(__dirname, 'src/static'),
    '@UI': path.resolve(__dirname, 'src/components/ui'),
  }),
);

