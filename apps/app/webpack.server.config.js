// Helper for combining webpack config objects
const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');

module.exports = (config, context) => {
  return merge(config, {
    target: 'node',
    externals: [nodeExternals()],
    devServer: {
      host: process.env.HOST,
    },
    output: {
      libraryTarget: 'commonjs2',
      filename: '[name].js',
    },
    externals: ["react-helmet"]
  });
};
