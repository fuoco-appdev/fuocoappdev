import type { Meta, StoryObj } from '@storybook/react';
import {
  ChevronRight,
  ShoppingBag,
  Refresh,
  ShoppingBasket,
} from '../components/Icon/Icons/Line';
import DatePicker from '../components/DatePicker/DatePicker';
import { ScrollView, View } from 'react-native';
import Colors from '../components/Themes/colors';
import { useState } from 'react';
import moment from 'moment';

const meta = {
  title: 'Data Input/Date Picker',
  component: DatePicker,
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date>(new Date(Date.now()));
    return (
      <DatePicker
        date={date}
        disabled={false}
        label={'Birthday'}
        onChange={(value) => setDate(value)}
      >
        {moment(date).format('MMM Do YY')}
      </DatePicker>
    );
  },
};

export const ErrorState: Story = {
  render: () => (
    <DatePicker
      disabled={false}
      label={'Input with an error message'}
      error={'Your password must be less than 4 characters.'}
    ></DatePicker>
  ),
};
