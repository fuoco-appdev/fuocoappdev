import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12 3.5c-4.69 0-8.93 1.9-12 4.98L12 20.5 24 8.48A16.88 16.88 0 0 0 12 3.5Z" />
  </Svg>
)

export default Icon
