import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m7.41 8.295 4.59 4.58 4.59-4.58L18 9.705l-6 6-6-6 1.41-1.41Z" />
  </Svg>
)

export default Icon
