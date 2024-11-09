import type { Meta, StoryObj } from '@storybook/react';
import {
  ChevronRight,
  ShoppingBag,
  Refresh,
  ShoppingBasket,
} from '../components/Icon/Icons/Line';
import Typography from '../components/Typography/Typography';
import { ScrollView, View } from 'react-native';
import Colors from '../components/Themes/colors';

const meta = {
  title: 'General/Typography',
  component: Typography,
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Typography>Hello World</Typography>,
};

export const Titles: Story = {
  render: () => (
    <>
      <Typography.Title level={1}>Hello world</Typography.Title>
      <Typography.Title level={2}>Hello world</Typography.Title>
      <Typography.Title level={3}>Hello world</Typography.Title>
      <Typography.Title level={4}>Hello world</Typography.Title>
      <Typography.Title level={5}>Hello world</Typography.Title>
    </>
  ),
};

export const Texts: Story = {
  render: () => (
    <>
      <Typography.Text>fuoco.appdev (default)</Typography.Text>
      <Typography.Text type="secondary">
        fuoco.appdev (secondary)
      </Typography.Text>
      <Typography.Text type="success">fuoco.appdev (success)</Typography.Text>
      <Typography.Text type="warning">fuoco.appdev (warning)</Typography.Text>
      <Typography.Text type="danger">fuoco.appdev (danger)</Typography.Text>
      <Typography.Text underline={true}>
        fuoco.appdev (underline)
      </Typography.Text>
      <Typography.Text strikethrough={true}>
        fuoco.appdev (strikethrough)
      </Typography.Text>
      <Typography.Text strong={true}>fuoco.appdev (strong)</Typography.Text>
    </>
  ),
};
