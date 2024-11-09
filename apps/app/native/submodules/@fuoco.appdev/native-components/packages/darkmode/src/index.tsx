import { ColorSchemeName } from 'react-native';
import { ReactNode } from 'react';
import { makeDecorator } from '@storybook/preview-api';
import { addons } from '@storybook/manager-api';
import { Theme } from './theme';

import Events from './constants';
import Container from './container';

export interface Mode {
  name: string;
  value: string;
}

export const withModes = makeDecorator({
  name: 'withModes',
  parameterName: 'modes',
  skipIfNoParametersOrOptions: true,

  wrapper: (getStory, context, { options, parameters }) => {
    const data = (parameters || options || { values: [] }) as {
      default?: string;
      values: Mode[];
    };
    const modes: Mode[] = data.values;

    let mode: ColorSchemeName = Theme.getTheme();
    let modeValue = '';
    if (modes.length !== 0) {
      addons.getChannel().emit(Events.SET, modes);
      if (!mode) {
        const defaultValue = data.default
          ? modes.find((b) => b.name === data.default)
          : undefined;
        const defaultOrFirst = defaultValue ? defaultValue : modes[0];

        if (defaultOrFirst) {
          modeValue = defaultOrFirst.value;
        }
      } else {
        const value = modes.find((b) => b.name === mode);
        modeValue = value?.value ?? '';
      }
    }

    return (
      <Container initialMode={modeValue} channel={addons.getChannel()}>
        {getStory(context) as ReactNode}
      </Container>
    );
  },
});
