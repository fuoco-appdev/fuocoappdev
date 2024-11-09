import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M6.41 6 5 7.41 9.58 12 5 16.59 6.41 18l6-6-6-6Z" />
    <Path d="m13 6-1.41 1.41L16.17 12l-4.58 4.59L13 18l6-6-6-6Z" />
  </Svg>
)

export default Icon
