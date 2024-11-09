import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M3 17h18v-2H3v2Zm0 3h18v-1H3v1Zm0-7h18v-3H3v3Zm0-9v4h18V4H3Z" />
  </Svg>
)

export default Icon
