import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m18 4.5-4 4h3v7c0 1.1-.9 2-2 2s-2-.9-2-2v-7c0-2.21-1.79-4-4-4s-4 1.79-4 4v7H2l4 4 4-4H7v-7c0-1.1.9-2 2-2s2 .9 2 2v7c0 2.21 1.79 4 4 4s4-1.79 4-4v-7h3l-4-4Z" />
  </Svg>
)

export default Icon
