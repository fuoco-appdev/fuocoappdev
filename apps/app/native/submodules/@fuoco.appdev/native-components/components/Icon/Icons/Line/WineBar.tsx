import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M6 3v6c0 2.97 2.16 5.43 5 5.91V19H8v2h8v-2h-3v-4.09c2.84-.48 5-2.94 5-5.91V3H6Zm6 10c-1.86 0-3.41-1.28-3.86-3h7.72c-.45 1.72-2 3-3.86 3Zm4-5H8V5h8v3Z" />
  </Svg>
)

export default Icon
