import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M6 17.59 7.41 19 12 14.42 16.59 19 18 17.59l-6-6-6 6Z" />
    <Path d="m6 11 1.41 1.41L12 7.83l4.59 4.58L18 11l-6-6-6 6Z" />
  </Svg>
)

export default Icon
