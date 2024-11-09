import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M3 13h8v2H3v-2Zm0 4h8v2H3v-2Zm0-8h8v2H3V9Zm0-4h8v2H3V5Zm16 2v10h-4V7h4Zm2-2h-8v14h8V5Z" />
  </Svg>
)

export default Icon
