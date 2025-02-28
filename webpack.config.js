const { createApp, createExample, createBrowserTest } = require('./webpack.config.common.js');
const webpack = require('webpack');

const examples = ['proteopedia-wrapper', 'basic-wrapper', 'lighting', 'alpha-orbitals'];
const tests = [
    'font-atlas',
    'marching-cubes',
    'render-lines', 'render-mesh', 'render-shape', 'render-spheres', 'render-structure', 'render-text',
    'parse-xtc'
];

// Create a function to add polyfills to each config
function addPolyfills(config) {
    // Make sure config has resolve and plugins properties
    config.resolve = config.resolve || {};
    config.resolve.fallback = {
        ...config.resolve.fallback,
        "util": require.resolve("util/"),
        "zlib": require.resolve("browserify-zlib"),
        "assert": require.resolve("assert/"),
        "buffer": require.resolve("buffer/"),
        "stream": require.resolve("stream-browserify")
    };

    config.plugins = config.plugins || [];
    config.plugins.push(
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
            process: 'process/browser'
        })
    );

    return config;
}

// Apply polyfills to each configuration
const viewerApp = addPolyfills(createApp('viewer', 'molstar'));
const dockingViewerApp = addPolyfills(createApp('docking-viewer', 'molstar'));
const exampleConfigs = examples.map(createExample).map(addPolyfills);
const testConfigs = tests.map(createBrowserTest).map(addPolyfills);

module.exports = [
    viewerApp,
    dockingViewerApp,
    ...exampleConfigs,
    ...testConfigs
];