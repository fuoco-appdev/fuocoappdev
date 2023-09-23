// Helper for combining webpack config objects
const { merge } = require('webpack-merge');
const { composePlugins, withWeb } = require('@nx/webpack');
const LoadablePlugin = require('@loadable/webpack-plugin');

module.exports = composePlugins(withWeb(), (config, { options, context }) => {
  return merge(config, {
    devServer: {
      host: process.env.HOST,
    },
    plugins: [new LoadablePlugin()]
  });
});
