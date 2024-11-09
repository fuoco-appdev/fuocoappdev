import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M21.5 5h-5v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V7h3V5Zm-7 0h-12v2h12V5Zm0 4h-12v2h12V9Zm-4 4h-8v2h8v-2Z" />
  </Svg>
)

export default Icon
