// Helper for combining webpack config objects
const { merge } = require('webpack-merge');
const { composePlugins, withNx } = require('@nx/webpack');
const LoadablePlugin = require('@loadable/webpack-plugin');
const { withReact } = require('@nx/react');
const webpack = require('webpack');

module.exports = composePlugins(withNx(), withReact(), (config, { options, context }) => {
  return merge(config, {
    plugins: [
      new LoadablePlugin(),
       new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      })]
  });
});
