// Helper for combining webpack config objects
const { merge } = require('webpack-merge');
const { composePlugins, withWeb } = require('@nx/webpack');

module.exports = composePlugins(withWeb(), (config, { options, context }) => {
  return merge(config, {
    devServer: {
      host: process.env.HOST,
    }
  });
});
