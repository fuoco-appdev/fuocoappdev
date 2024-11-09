import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m22 7.93-1.41-1.41-4.03 4.53L9.5 4.5 2 12.01l1.5 1.5 6.14-6.15 5.59 5.18-1.73 1.95-4-4L2 18l1.5 1.5 6-6.01 4 4 3.19-3.59 3.9 3.61L22 16.1l-3.98-3.7L22 7.93Z" />
  </Svg>
)

export default Icon
