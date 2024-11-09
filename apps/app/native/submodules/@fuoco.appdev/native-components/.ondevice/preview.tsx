import React from 'react';
import { withBackgrounds } from '@storybook/addon-ondevice-backgrounds';
import { Preview } from '@storybook/react';
import { addons } from '@storybook/preview-api';
import { themes } from '@storybook/theming';
import { withModes } from '../packages/darkmode/src';

const preview: Preview = {
  parameters: {
    modes: {
      default: 'light',
      values: [
        { name: 'light', value: 'white' },
        { name: 'dark', value: '#121212' },
      ],
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [withModes],
};

export default preview;
