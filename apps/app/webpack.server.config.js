// Helper for combining webpack config objects
const { merge } = require('webpack-merge');
const { composePlugins, withNx } = require('@nx/webpack');
const { PostcssCliResources } = require('@nx/webpack/src/utils/webpack/plugins/postcss-cli-resources');
const { normalizeExtraEntryPoints } = require('@nx/webpack/src/utils/webpack/normalize-entry');
const { getCSSModuleLocalIdent } = require('@nx/webpack/src/utils/get-css-module-local-ident');
const { getClientEnvironment } = require('@nx/webpack/src/utils/get-client-environment');
const { WriteIndexHtmlPlugin } = require('@nx/webpack/src/plugins/write-index-html-plugin');
const { getOutputHashFormat } = require('@nx/webpack/src/utils/hash-format');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssImports = require('postcss-import');
const autoprefixer = require('autoprefixer');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');
const { basename, join } = require('path');
const webpack = require('webpack');
const {
  ids,
} = require('webpack');
const LoadablePlugin = require('@loadable/webpack-plugin');

function postcssOptionsCreator(
  options,
  includePaths,
  forCssModules = false
) {
  const hashFormat = getOutputHashFormat(options.outputHashing);
  // PostCSS options depend on the webpack loader, but we need to set the `config` path as a string due to this check:
  // https://github.com/webpack-contrib/postcss-loader/blob/0d342b1/src/utils.js#L36

  const postcssOptions = (loader) => ({
    map: options.sourceMap &&
      options.sourceMap !== 'hidden' && {
        inline: true,
        annotation: false,
      },
    plugins: [
      postcssImports({
        addModulesDirectories: includePaths,
        resolve: (url) => (url.startsWith('~') ? url.slice(1) : url),
      }),
      ...(forCssModules
        ? []
        : [
            PostcssCliResources({
              baseHref: options.baseHref,
              deployUrl: options.deployUrl,
              loader,
              filename: `[name]${hashFormat.file}.[ext]`,
            }),
            autoprefixer(),
          ]),
    ],
  });

  // If a path to postcssConfig is passed in, set it for app and all libs, otherwise
  // use automatic detection.
  if (typeof options.postcssConfig === 'string') {
    postcssOptions.config = path.join(options.root, options.postcssConfig);
  }

  return postcssOptions;
}

function getCommonLoadersForGlobalStyle(
  options,
  includePaths
) {
  return [
    {
      loader: MiniCssExtractPlugin.loader,
      options: { esModule: true },
    },
    { loader: require.resolve('css-loader'), options: { url: false } },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        implementation: require('postcss'),
        postcssOptions: postcssOptionsCreator(options, { includePaths }),
      },
    },
  ];
}

function getCommonLoadersForCssModules(
  options,
  includePaths
) {
  // load component css as raw strings
  return [
    {
      loader: options.extractCss
        ? MiniCssExtractPlugin.loader
        : require.resolve('style-loader'),
    },
    {
      loader: require.resolve('css-loader'),
      options: {
        modules: {
          mode: 'local',
          getLocalIdent: getCSSModuleLocalIdent,
        },
        importLoaders: 1,
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        implementation: require('postcss'),
        postcssOptions: postcssOptionsCreator(options, {
          includePaths,
          forCssModules: true,
        }),
      },
    },
  ];
}

module.exports = composePlugins(withNx(), (config, { options, context }) => {
  const includePaths = [];
  if (options?.stylePreprocessorOptions?.includePaths?.length > 0) {
    options.stylePreprocessorOptions.includePaths.forEach(
      (includePath) =>
        includePaths.push(path.resolve(options.root, includePath))
    );
  }
  const minimizer = [
    new ids.HashedModuleIdsPlugin(),
  ];
  const stylesOptimization =
      typeof options.optimization === 'object'
        ? options.optimization.styles
        : options.optimization;
  if (stylesOptimization) {
    minimizer.push(
      new CssMinimizerPlugin({
        test: /\.(?:css|scss|sass|less|styl)$/,
      })
    );
  }
  const hashFormat = getOutputHashFormat(
    options.outputHashing
  );

  const entry = {};
  const globalStylePaths = [];
  // Process global styles.
  if (options.styles.length > 0) {
    normalizeExtraEntryPoints(options.styles, 'styles').forEach(
      (style) => {
        const resolvedPath = path.resolve(options.root, style.input);
        // Add style entry points.
        if (entry[style.bundleName]) {
          entry[style.bundleName].push(resolvedPath);
        } else {
          entry[style.bundleName] = [resolvedPath];
        }

        // Add global css paths.
        globalStylePaths.push(resolvedPath);
      }
    );
  }

  return merge(config, {
    externals: [nodeExternals()],
    output: {
      filename: '[name].js',
      globalObject: 'this',
      libraryTarget: 'commonjs2',
    },
    externals: ["react-helmet"],
    resolve: {
      extensions: [ '.ts', '.tsx', '.mjs', '.js', '.jsx', '.json' ],
      alias: {},
      mainFields: [ 'browser', 'module', 'main' ] 
    },
    optimization: {
      minimizer: minimizer
    },
    module: {
      rules: [
        {
          test: /\.module\.css$/,
          exclude: globalStylePaths,
          use: getCommonLoadersForCssModules(options, includePaths),
        },
        {
          test: /\.module\.(scss|sass)$/,
          exclude: globalStylePaths,
          use: [
            ...getCommonLoadersForCssModules(options, includePaths),
            {
              loader: require.resolve('sass-loader'),
              options: {
                implementation: require('sass'),
                sassOptions: {
                  fiber: false,
                  precision: 8,
                  includePaths,
                },
              },
            },
          ],
        },
        {
          test: /\.css$/,
          include: globalStylePaths,
          use: getCommonLoadersForGlobalStyle(options, includePaths),
        },
        {
          test: /\.scss$|\.sass$/,
          include: globalStylePaths,
          use: [
            ...getCommonLoadersForGlobalStyle(options, includePaths),
            {
              loader: require.resolve('sass-loader'),
              options: {
                implementation: require('sass'),
                sourceMap: !!options.sourceMap,
                sassOptions: {
                  fiber: false,
                  // bootstrap-sass requires a minimum precision of 8
                  precision: 8,
                  includePaths,
                },
              },
            },
          ],
        },
      ]
    },
    plugins: [
      new LoadablePlugin(),
      new WriteIndexHtmlPlugin({
        crossOrigin: options.crossOrigin,
        sri: options.subresourceIntegrity,
        outputPath: basename(options.index),
        indexPath: join(context.root, options.index),
        baseHref: options.baseHref,
        deployUrl: options.deployUrl,
        scripts: options.scripts,
        styles: options.styles,
      }),
      new MiniCssExtractPlugin({
        filename: `[name]${hashFormat.extract}.css`
      }),
      new webpack.DefinePlugin(
        getClientEnvironment(process.env.NODE_ENV).stringified
      ),
      new webpack.DefinePlugin({
        'process.env.HOST': JSON.stringify(process.env.HOST),
        'process.env.DEBUG_SUSPENSE': JSON.stringify(process.env.DEBUG_SUSPENSE || 'false'),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.env.SUPABASE_ANON_KEY': JSON.stringify(process.env.SUPABASE_ANON_KEY),
        'process.env.SUPABASE_SERVICE_ROLE_KEY': JSON.stringify(process.env.SUPABASE_SERVICE_ROLE_KEY),
        'process.env.S3_ACCESS_KEY_ID': JSON.stringify(process.env.S3_ACCESS_KEY_ID),
        'process.env.S3_SECRET_ACCESS_KEY': JSON.stringify(process.env.S3_SECRET_ACCESS_KEY),
        'process.env.MAPBOX_ACCESS_TOKEN': JSON.stringify(process.env.MAPBOX_ACCESS_TOKEN),
        'process.env.STRIPE_PUBLISHABLE_KEY': JSON.stringify(process.env.STRIPE_PUBLISHABLE_KEY),
        'process.env.DEEPL_AUTH_KEY': JSON.stringify(process.env.DEEPL_AUTH_KEY),
        'process.env.MEDUSA_API_TOKEN': JSON.stringify(process.env.MEDUSA_API_TOKEN),
        'process.env.MEDUSA_PUBLIC_KEY': JSON.stringify(process.env.MEDUSA_PUBLIC_KEY),
        'process.env.MEILISEARCH_PUBLIC_KEY': JSON.stringify(process.env.MEILISEARCH_PUBLIC_KEY),
      })
    ],
  });
});
