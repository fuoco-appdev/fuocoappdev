import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12 2.5c-4.42 0-8 .5-8 4v10c0 .88.39 1.67 1 2.22v1.78c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22v-10c0-3.5-3.58-4-8-4Zm5.66 2.99H6.34c.55-.53 1.97-.99 5.66-.99 3.69 0 5.11.46 5.66.99Zm.34 2v3.01H6V7.49h12Zm-.34 9.74-.29.27H6.63l-.29-.27A.968.968 0 0 1 6 16.5v-4h12v4c0 .37-.21.62-.34.73Z" />
    <Path d="M8.5 16.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
    <Path d="M15.5 16.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
  </Svg>
)

export default Icon
