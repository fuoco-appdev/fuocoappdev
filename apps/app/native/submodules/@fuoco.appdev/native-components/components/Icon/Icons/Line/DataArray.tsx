import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M15 4v2h3v12h-3v2h5V4h-5Z" />
    <Path d="M4 20h5v-2H6V6h3V4H4v16Z" />
  </Svg>
)

export default Icon
