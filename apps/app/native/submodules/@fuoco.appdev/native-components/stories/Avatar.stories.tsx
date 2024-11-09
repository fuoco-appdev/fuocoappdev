import type { Meta, StoryObj } from '@storybook/react';
import {
  ChevronRight,
  ShoppingBag,
  Refresh,
  ShoppingBasket,
  Airplay,
} from '../components/Icon/Icons/Line';
import Avatar from '../components/Avatar/Avatar';
import { ScrollView, View } from 'react-native';
import Colors from '../components/Themes/colors';
import { useState } from 'react';
import moment from 'moment';

const meta = {
  title: 'General/Avatar',
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return <Avatar />;
  },
};

export const Text: Story = {
  render: () => {
    return <Avatar text={'Shoury'} />;
  },
};

export const Icon: Story = {
  render: () => {
    return (
      <Avatar avatarIcon={<Airplay size={21} color={Colors.gray_900} />} />
    );
  },
};

export const Edit: Story = {
  render: () => {
    return <Avatar editMode={true} />;
  },
};
