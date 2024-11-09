import { view } from './storybook.requires';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themes } from '@storybook/theming';

const StorybookUIRoot = view.getStorybookUI({
  storage: {
    getItem: AsyncStorage.getItem,
    setItem: AsyncStorage.setItem,
  },
});

export default StorybookUIRoot;
