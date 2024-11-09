import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <Path d="M10 3h4v12h-4V3Z" />
  </Svg>
)

export default Icon
