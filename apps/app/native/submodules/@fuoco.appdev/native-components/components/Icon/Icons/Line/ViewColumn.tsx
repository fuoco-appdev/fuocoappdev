import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M3 5v14h18V5H3Zm5.33 12H5V7h3.33v10Zm5.34 0h-3.33V7h3.33v10ZM19 17h-3.33V7H19v10Z" />
  </Svg>
)

export default Icon
