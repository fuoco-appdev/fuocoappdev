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
        'process.env.HOST': JSON.stringify(process.env.HOST),
        'process.env.DEBUG_SUSPENSE': JSON.stringify(process.env.DEBUG_SUSPENSE || 'false'),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.env.SUPABASE_ANON_KEY': JSON.stringify(process.env.SUPABASE_ANON_KEY),
        'process.env.S3_ACCESS_KEY_ID': JSON.stringify(process.env.S3_ACCESS_KEY_ID),
        'process.env.S3_SECRET_ACCESS_KEY': JSON.stringify(process.env.S3_SECRET_ACCESS_KEY),
        'process.env.MAPBOX_ACCESS_TOKEN': JSON.stringify(process.env.MAPBOX_ACCESS_TOKEN),
        'process.env.STRIPE_PUBLISHABLE_KEY': JSON.stringify(process.env.STRIPE_PUBLISHABLE_KEY),
        'process.env.DEEPL_AUTH_KEY': JSON.stringify(process.env.DEEPL_AUTH_KEY),
        'process.env.MEDUSA_API_TOKEN': JSON.stringify(process.env.MEDUSA_API_TOKEN),
        'process.env.MEDUSA_PUBLIC_KEY': JSON.stringify(process.env.MEDUSA_PUBLIC_KEY),
        'process.env.MEILISEARCH_PUBLIC_KEY': JSON.stringify(process.env.MEILISEARCH_PUBLIC_KEY),
      })]
  });
});
