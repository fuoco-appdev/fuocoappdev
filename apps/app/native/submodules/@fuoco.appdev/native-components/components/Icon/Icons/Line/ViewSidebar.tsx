import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M2 4v16h20V4H2Zm18 4.67h-2.5V6H20v2.67Zm-2.5 2H20v2.67h-2.5v-2.67ZM4 6h11.5v12H4V6Zm13.5 12v-2.67H20V18h-2.5Z" />
  </Svg>
)

export default Icon
