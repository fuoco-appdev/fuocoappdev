const path = require('path');

module.exports = {
  presets: [
    'module:@react-native/babel-preset'
  ],
  plugins: [
    "babel-plugin-transform-typescript-metadata",
    "@babel/plugin-transform-export-namespace-from",
    ['@babel/plugin-proposal-decorators', {"legacy": true}],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
      },
    ],
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@fuoco.appdev/native-components': './submodules/@fuoco.appdev/native-components/components',
        },
      },
    ],
    "react-native-reanimated/plugin"
  ],
};
