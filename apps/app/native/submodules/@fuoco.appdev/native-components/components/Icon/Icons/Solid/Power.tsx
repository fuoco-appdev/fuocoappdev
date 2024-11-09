import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M16 7V3h-2v4h-4V3H8v4c-1.1 0-2 .9-2 2v5.5L9.5 18v3h5v-3l3.5-3.5V9c0-1.1-.9-2-2-2Z" />
  </Svg>
)

export default Icon
