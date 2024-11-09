/**
 * @format
 */
/* eslint-disable prettier/prettier */
import { AppRegistry } from 'react-native';
import TextEncoding from 'text-encoding';
import App from './App';
import { name as appName } from './app.json';

Object.assign(global, {
    TextEncoder: TextEncoding.TextEncoder,
    TextDecoder: TextEncoding.TextDecoder,
    Buffer: require('buffer').Buffer
});

AppRegistry.registerComponent(appName, () => App);
