import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M16.59 8.295 12 12.875l-4.59-4.58L6 9.705l6 6 6-6-1.41-1.41Z" />
  </Svg>
)

export default Icon
