import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M16 13h-3V3h-2v10H8l4 4 4-4ZM4 19v2h16v-2H4Z" />
  </Svg>
)

export default Icon
