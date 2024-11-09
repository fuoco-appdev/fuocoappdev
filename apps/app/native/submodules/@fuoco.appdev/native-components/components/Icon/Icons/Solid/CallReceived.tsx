import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M20 5.41 18.59 4 7 15.59V9H5v10h10v-2H8.41L20 5.41Z" />
  </Svg>
)

export default Icon
