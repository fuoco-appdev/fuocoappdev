import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M3 18h6v-2H3v2ZM3 6v2h18V6H3Zm0 7h12v-2H3v2Z" />
  </Svg>
)

export default Icon
