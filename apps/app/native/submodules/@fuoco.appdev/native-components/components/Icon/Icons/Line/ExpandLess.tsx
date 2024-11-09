import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m12 8.295-6 6 1.41 1.41 4.59-4.58 4.59 4.58 1.41-1.41-6-6Z" />
  </Svg>
)

export default Icon
