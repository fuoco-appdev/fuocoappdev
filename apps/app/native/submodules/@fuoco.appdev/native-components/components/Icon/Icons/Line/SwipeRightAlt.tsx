import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12.9 11a5 5 0 1 0 0 2h4.27l-1.59 1.59L17 16l4-4-4-4-1.41 1.41L17.17 11H12.9ZM8 9c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3Z" />
  </Svg>
)

export default Icon
