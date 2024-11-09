import type { Meta, StoryObj } from '@storybook/react';
import { ChevronRight, ShoppingBag, Refresh } from '../components/Icon/Icons/Line';
import Button from '../components/Button/Button';
import { ScrollView, View } from 'react-native';

const meta = {
  title: 'General/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Button>Button text</Button>,
};

export const Loading: Story = {
  render: () => (
    <Button
      size={'full'}
      block={true}
      loading={true}
      loadingComponent={<Refresh size={24} color={'#fff'} />}
    >
      Button text
    </Button>
  ),
};
export const withStyles: Story = {
  render: () => <Button>Button text</Button>,
};
export const WithIcon: Story = {
  render: () => (
    <Button type={'primary'} icon={<ChevronRight size={21} color={'#fff'} />}>
      Button text
    </Button>
  ),
};
export const WithIconRight: Story = {
  render: () => (
    <Button
      type={'primary'}
      iconRight={<ChevronRight size={21} color={'#fff'} />}
    >
      Button text
    </Button>
  ),
};
export const WithBlock: Story = {
  render: () => (
    <Button type={'primary'} block={true}>
      Button text
    </Button>
  ),
};
export const WithOnlyIcon: Story = {
  render: () => <Button icon={<ChevronRight size={21} color={'#fff'} />} />,
};
export const WithOnlyLoading: Story = {
  render: () => <Button loading={true} />,
};
// export const withRef = () => {
//   const buttonRef = useRef<HTMLButtonElement | null>(null);
//   const [msg, setMsg] = useState<string>('Click button to console.log Ref');

//   function onClick() {
//     const message = `container: button:`;
//     setMsg(message);
//     console.log(message);
//   }

//   return (
//     <>
//       <Button ref={buttonRef} onClick={onClick}>
//         Button with forwardRef
//       </Button>

//       <p style={{ color: '#666666' }}>{msg}</p>
//     </>
//   );
// };
export const AllButtons: Story = {
  render: (args: any) => (
    <>
      <ScrollView>
        <View>
          <Button {...args} size="tiny">
            Button text
          </Button>
          <Button {...args} size="tiny" type="secondary">
            Button text
          </Button>
          <Button {...args} size="tiny" type="default">
            Button text
          </Button>
          <Button {...args} size="tiny" type="link">
            Button text
          </Button>
          <Button {...args} size="tiny" type="text">
            Button text
          </Button>
          <Button {...args} size="tiny" type="dashed">
            Button text
          </Button>
          <Button {...args} size="tiny" type="outline">
            Button text
          </Button>
          <Button {...args} size="tiny" type="rounded">
            Button text
          </Button>
        </View>

        <View>
          <Button {...args} size="small">
            Button text
          </Button>
          <Button {...args} size="small" type="secondary">
            Button text
          </Button>
          <Button {...args} size="small" type="default">
            Button text
          </Button>
          <Button {...args} size="small" type="link">
            Button text
          </Button>
          <Button {...args} size="small" type="text">
            Button text
          </Button>
          <Button {...args} size="small" type="dashed">
            Button text
          </Button>
          <Button {...args} size="small" type="outline">
            Button text
          </Button>
          <Button {...args} size="small" type="rounded">
            Button text
          </Button>
        </View>
        <View>
          <Button {...args}>Button text</Button>
          <Button {...args} size="medium" type="secondary">
            Button text
          </Button>
          <Button {...args} size="medium" type="default">
            Button text
          </Button>
          <Button {...args} size="medium" type="link">
            Button text
          </Button>
          <Button {...args} size="medium" type="text">
            Button text
          </Button>
          <Button {...args} size="medium" type="dashed">
            Button text
          </Button>
          <Button {...args} size="medium" type="outline">
            Button text
          </Button>
          <Button {...args} size="medium" type="rounded">
            Button text
          </Button>
        </View>
        <View>
          <Button {...args} size="large">
            Button text
          </Button>
          <Button {...args} size="large" type="secondary">
            Button text
          </Button>
          <Button {...args} size="large" type="default">
            Button text
          </Button>
          <Button {...args} size="large" type="link">
            Button text
          </Button>
          <Button {...args} size="large" type="text">
            Button text
          </Button>
          <Button {...args} size="large" type="dashed">
            Button text
          </Button>
          <Button {...args} size="large" type="outline">
            Button text
          </Button>
          <Button {...args} size="large" type="rounded">
            Button text
          </Button>
        </View>
        <View>
          <Button {...args} size="xlarge">
            Button text
          </Button>
          <Button {...args} size="xlarge" type="secondary">
            Button text
          </Button>
          <Button {...args} size="xlarge" type="default">
            Button text
          </Button>
          <Button {...args} size="xlarge" type="link">
            Button text
          </Button>
          <Button {...args} size="xlarge" type="text">
            Button text
          </Button>
          <Button {...args} size="xlarge" type="dashed">
            Button text
          </Button>
          <Button {...args} size="xlarge" type="outline">
            Button text
          </Button>
          <Button {...args} size="xlarge" type="rounded">
            Button text
          </Button>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: 56,
          }}
        >
          <Button {...args} size="full" block={true} touchScreen={true}>
            Button text
          </Button>
          <Button
            {...args}
            size="full"
            type="secondary"
            block={true}
            touchScreen={true}
          >
            Button text
          </Button>
          <Button
            {...args}
            size="full"
            type="default"
            block={true}
            touchScreen={true}
          >
            Button text
          </Button>
          <Button
            {...args}
            size="full"
            type="link"
            block={true}
            touchScreen={true}
          >
            Button text
          </Button>
          <Button
            {...args}
            size="full"
            type="text"
            block={true}
            touchScreen={true}
          >
            Button text
          </Button>
          <Button
            {...args}
            size="full"
            type="dashed"
            block={true}
            touchScreen={true}
          >
            Button text
          </Button>
          <Button
            {...args}
            size="full"
            type="outline"
            block={true}
            touchScreen={true}
          >
            Button text
          </Button>
          <Button
            {...args}
            size="full"
            rounded={true}
            block={true}
            touchScreen={true}
          >
            Button text
          </Button>
        </View>
      </ScrollView>
    </>
  ),
};

export const Rounded: Story = {
  render: (args: any) => (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: '80%',
        width: '100%',
      }}
    >
      <Button
        {...args}
        rounded={true}
        touchScreen={false}
        floatingLabel={'Shopping cart'}
        icon={<ShoppingBag size={21} color={'#fff'} />}
      />
    </View>
  ),
};
