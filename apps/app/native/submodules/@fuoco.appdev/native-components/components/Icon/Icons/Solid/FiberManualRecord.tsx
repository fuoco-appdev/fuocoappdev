import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
  </Svg>
)

export default Icon
