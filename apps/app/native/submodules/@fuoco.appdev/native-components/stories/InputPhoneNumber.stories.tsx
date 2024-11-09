import type { Meta, StoryObj } from '@storybook/react';
import {
  ChevronRight,
  ShoppingBag,
  Refresh,
  ShoppingBasket,
} from '../components/Icon/Icons/Line';
import InputPhoneNumber from '../components/InputPhoneNumber/InputPhoneNumber';
import { ScrollView, View } from 'react-native';
import Colors from '../components/Themes/colors';
import { PortalProvider } from '../components/Portal';

const meta = {
  title: 'Data Input/Input Phone Number',
  component: InputPhoneNumber,
} satisfies Meta<typeof InputPhoneNumber>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <PortalProvider>
        <InputPhoneNumber label={'Phone number'} />
      </PortalProvider>
    );
  },
};
