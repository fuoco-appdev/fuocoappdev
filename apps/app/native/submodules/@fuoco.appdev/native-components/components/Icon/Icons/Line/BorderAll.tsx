import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M3 3v18h18V3H3Zm8 16H5v-6h6v6Zm0-8H5V5h6v6Zm8 8h-6v-6h6v6Zm0-8h-6V5h6v6Z" />
  </Svg>
)

export default Icon
