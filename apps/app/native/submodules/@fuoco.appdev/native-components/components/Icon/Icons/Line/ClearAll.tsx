import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M5 13h14v-2H5v2Zm-2 4h14v-2H3v2ZM7 7v2h14V7H7Z" />
  </Svg>
)

export default Icon
