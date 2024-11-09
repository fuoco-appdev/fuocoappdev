import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';

// This is the default configuration
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

const AppEntryPoint = require('./.ondevice').default;

export default AppEntryPoint;
