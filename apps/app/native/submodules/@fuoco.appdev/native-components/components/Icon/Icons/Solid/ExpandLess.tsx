import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6Z" />
  </Svg>
)

export default Icon
