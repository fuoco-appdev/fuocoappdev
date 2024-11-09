import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M7 22h2v2H7v-2Zm4 0h2v2h-2v-2Zm4 0h2v2h-2v-2ZM16 .01 8 0C6.9 0 6 .9 6 2v16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V2c0-1.1-.9-1.99-2-1.99ZM16 18H8v-1h8v1Zm0-3H8V5h8v10Zm0-12H8V2h8v1Z" />
  </Svg>
)

export default Icon
