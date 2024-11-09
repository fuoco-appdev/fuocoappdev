import { AddonStore, type API } from '@storybook/manager-api';
import { ColorSchemeName, StyleSheet, Text, View } from 'react-native';

import Swatch from './swatch';
import ModeEvents, { PARAM_KEY } from './constants';
import { Mode } from './index';
import { Theme } from './theme';

const codeSample = `
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { withBackgrounds } from '@storybook/addon-ondevice-backgrounds';
import { Text, StyleSheet } from 'react-native';

const Background = () => (
  <Text style={styles.text}>Change background color via Addons -&gt; Background</Text>
);

const styles = StyleSheet.create({
  text: { color: 'black' },
});

const BackgroundMeta: ComponentMeta<typeof Background> = {
  title: 'Background CSF',
  component: Background,
  decorators: [withBackgrounds],
  parameters: {
    backgrounds: {
      default: 'plain',
      values: [
        { name: 'plain', value: 'white' },
        { name: 'warm', value: 'hotpink' },
        { name: 'cool', value: 'deepskyblue' },
      ],
    },
  },
};

export default BackgroundMeta;

type BackgroundStory = ComponentStory<typeof Background>;

export const Basic: BackgroundStory = () => <Background />;
`.trim();

const Instructions = () => (
  <View>
    <Text style={[styles.paragraph, styles.title]}>Setup Instructions</Text>
    <Text style={styles.paragraph}>
      Please add the background decorator definition to your story. The
      background decorate accepts an array of items, which should include a name
      for your color (preferably the css class name) and the corresponding color
      / image value.
    </Text>
    <Text style={styles.paragraph}>
      Below is an example of how to add the background decorator to your story
      definition. Long press the example to copy it.
    </Text>
    <Text selectable>{codeSample}</Text>
  </View>
);

export type Channel = ReturnType<AddonStore['getChannel']>;
interface DarkmodePanelProps {
  channel: Channel;
  api: API;
  active: boolean;
}

const DarkmodePanel = ({ active, api, channel }: DarkmodePanelProps) => {
  if (!active) {
    return null;
  }

  const store = api.store();
  const storyId = store.getSelection().storyId;
  const story = store.fromId(storyId);
  const modes: { default?: string; values: Mode[] } =
    story.parameters[PARAM_KEY];

  const setBackgroundFromSwatch = async (name: string, value: string) => {
    Theme.setTheme(name as ColorSchemeName);
    channel.emit(ModeEvents.UPDATE_MODE, value);
  };

  return (
    <View>
      {modes ? (
        modes.values.map(({ value, name }) => (
          <View key={`${name} ${value}`}>
            <Swatch
              value={value}
              name={name}
              setBackground={setBackgroundFromSwatch}
            />
          </View>
        ))
      ) : (
        <Instructions />
      )}
    </View>
  );
};

export default DarkmodePanel;

const styles = StyleSheet.create({
  title: { fontSize: 16 },
  paragraph: { marginBottom: 8 },
});
