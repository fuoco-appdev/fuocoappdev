import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M7.41 13.41 6 12l-4 4 4 4 1.41-1.41L5.83 17H21v-2H5.83l1.58-1.59Z" />
    <Path d="M16.59 10.59 18 12l4-4-4-4-1.41 1.41L18.17 7H3v2h15.17l-1.58 1.59Z" />
  </Svg>
)

export default Icon
