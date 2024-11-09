const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');
const projectRoot =  path.resolve(__dirname);
const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
    projectRoot,
    watchFolders: [
        path.resolve(__dirname, '../shared'),
        path.resolve(__dirname, '../../../node_modules'),
    ],
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: false,
            },
        }),
        babelTransformerPath: require.resolve(
            "react-native-svg-transformer/react-native"
        )
    },
    resolver: {
        assetExts: assetExts.filter((ext) => ext !== "svg"),
        sourceExts: [...sourceExts, "svg", "md"],
        nodeModulesPaths: ['../../../node_modules'],
    }
};

module.exports = mergeConfig(defaultConfig, config);
