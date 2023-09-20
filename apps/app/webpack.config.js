// Helper for combining webpack config objects
const { merge } = require('webpack-merge');

module.exports = (config, context) => {
  return merge(config, {
    devServer: {
      host: process.env.HOST,
    },
    output: {
      filename: '[name].js',
    },
  });
};
