import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M2 22h20V2L2 22Zm18-2h-3V9.83l3-3V20Z" />
  </Svg>
)

export default Icon
