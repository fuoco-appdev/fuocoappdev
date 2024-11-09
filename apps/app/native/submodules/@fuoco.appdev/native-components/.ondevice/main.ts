import { StorybookConfig } from '@storybook/react-native';

const main: StorybookConfig = {
  stories: ['../stories/**/*.stories.?(ts|tsx|js|jsx)'],
  addons: [
    '@storybook/addon-ondevice-notes',
    '@storybook/addon-ondevice-controls',
    '@storybook/addon-ondevice-actions',
    '../packages/darkmode',
  ],
};

export default main;