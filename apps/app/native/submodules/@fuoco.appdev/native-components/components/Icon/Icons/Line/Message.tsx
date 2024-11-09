import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M4 4h16v12H5.17L4 17.17V4Zm0-2c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H4Zm2 10h12v2H6v-2Zm0-3h12v2H6V9Zm0-3h12v2H6V6Z" />
  </Svg>
)

export default Icon
