import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M13 6.99h3L12 3 8 6.99h3v10.02H8L12 21l4-3.99h-3V6.99Z" />
  </Svg>
)

export default Icon
