import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M17.59 18 19 16.59 14.42 12 19 7.41 17.59 6l-6 6 6 6Z" />
    <Path d="m11 18 1.41-1.41L7.83 12l4.58-4.59L11 6l-6 6 6 6Z" />
  </Svg>
)

export default Icon
