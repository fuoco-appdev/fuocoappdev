import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M10 5v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V5h-8Z" />
  </Svg>
)

export default Icon
