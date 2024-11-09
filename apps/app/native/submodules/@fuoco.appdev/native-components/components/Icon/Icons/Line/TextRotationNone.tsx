import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m20 18-3-3v2H4v2h13v2l3-3ZM8.5 11.8h5l.9 2.2h2.1L11.75 3h-1.5L5.5 14h2.1l.9-2.2ZM11 4.98 12.87 10H9.13L11 4.98Z" />
  </Svg>
)

export default Icon
