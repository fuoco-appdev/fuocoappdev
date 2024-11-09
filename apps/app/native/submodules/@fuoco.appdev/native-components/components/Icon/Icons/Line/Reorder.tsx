import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M3 15h18v-2H3v2Zm0 4h18v-2H3v2Zm0-8h18V9H3v2Zm0-6v2h18V5H3Z" />
  </Svg>
)

export default Icon
