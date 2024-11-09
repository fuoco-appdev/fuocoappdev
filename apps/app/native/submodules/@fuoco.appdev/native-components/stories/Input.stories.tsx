import type { Meta, StoryObj } from '@storybook/react';
import {
  ChevronRight,
  ShoppingBag,
  Refresh,
  ShoppingBasket,
} from '../components/Icon/Icons/Line';
import Input from '../components/Input/Input';
import { ScrollView, View } from 'react-native';
import Colors from '../components/Themes/colors';

const meta = {
  title: 'Data Input/Input',
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Input placeholder={'Type text here ...'} disabled={false} label={'Name'} />
  ),
};

export const ErrorState: Story = {
  render: () => (
    <Input
      placeholder={'Type text here ...'}
      disabled={false}
      label={'Input with an error message'}
      error={'Your password must be less than 4 characters.'}
    />
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Input
      placeholder={'Type text here ...'}
      disabled={false}
      label={'Input with an icon'}
      icon={<ShoppingBasket size={21} color={Colors.gray_900} />}
    />
  ),
};

export const WithOption: Story = {
  render: () => (
    <Input
      placeholder={'Type text here ...'}
      disabled={false}
      label={'Input with an error message'}
      labelOptional={'This is required'}
    />
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Input
      placeholder={'Type text here ...'}
      disabled={false}
      label={'Input with an error message'}
      descriptionText={'Make your password short and easy to guess'}
    />
  ),
};

export const TextArea: Story = {
  render: () => <Input.TextArea label={'This is a text area'} />,
};

export const TextAreaWithError: Story = {
  render: () => (
    <Input.TextArea
      label={'This is a text area'}
      error={'Field cannot be empty'}
    />
  ),
};

export const TextAreaWithLimit: Story = {
  render: () => (
    <Input.TextArea
      label={'This is a text area, with 10 rows'}
      labelOptional={'500 character limit'}
      numberOfLines={10}
      limit={500}
    />
  ),
};

export const WithRevealAndCopy: Story = {
  render: () => (
    <Input
      label={'Reveal and copy'}
      labelOptional={'Reveal the text, then copy it'}
      value={'12341234HDGRHSGR/adJDJD'}
      copy={true}
      reveal={true}
    />
  ),
};

export const WithCustomActions: Story = {
  render: () => <Input />,
};

export const WithBeforeAndAfterLabel: Story = {
  render: () => <Input />,
};

export const Size: Story = {
  render: () => <Input />,
};

export const Borderless: Story = {
  render: () => <Input />,
};

export const Date: Story = {
  render: () => <Input />,
};
