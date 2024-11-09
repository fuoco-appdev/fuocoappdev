import type { Meta, StoryObj } from '@storybook/react';
import {
  ChevronRight,
  ShoppingBag,
  Refresh,
  ShoppingBasket,
} from '../components/Icon/Icons/Line';
import Divider from '../components/Divider/Divider';
import { ScrollView, View } from 'react-native';
import Colors from '../components/Themes/colors';

const meta = {
  title: 'Utilities/Divider',
  component: Divider,
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Divider />,
};

export const WithCenterText: Story = {
  render: () => <Divider>Hello World</Divider>,
};

export const WithLeftText: Story = {
  render: () => <Divider orientation={'left'}>Hello World</Divider>,
};

export const WithRightText: Story = {
  render: () => <Divider orientation={'right'}>Hello World</Divider>,
};
