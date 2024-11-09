import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2ZM7 4V3h10v1H7Zm0 14V6h10v12H7Zm0 3v-1h10v1H7Z" />
    <Path d="M16 7H8v2h8V7Z" />
  </Svg>
)

export default Icon
