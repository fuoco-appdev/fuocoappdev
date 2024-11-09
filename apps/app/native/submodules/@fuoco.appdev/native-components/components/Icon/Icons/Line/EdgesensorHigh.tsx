import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M3 7h2v7H3V7Zm-3 3h2v7H0v-7Zm22-3h2v7h-2V7Zm-3 3h2v7h-2v-7Zm-3-7.99L8 2c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V4c0-1.1-.9-1.99-2-1.99ZM16 20H8v-1h8v1Zm0-3H8V7h8v10ZM8 5V4h8v1H8Z" />
  </Svg>
)

export default Icon
