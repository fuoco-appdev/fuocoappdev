import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M13 18.5h-2v3h2v-3Z" />
    <Path d="M5 10.5H2v2h3v-2Z" />
    <Path d="M22 10.5h-3v2h3v-2Z" />
    <Path d="m17.301 15.894-1.407 1.407 2.121 2.122 1.407-1.407-2.12-2.122Z" />
    <Path d="m6.705 15.887-2.12 2.122 1.406 1.407 2.122-2.122-1.408-1.407Z" />
    <Path d="M15 7.52V2.5H9v5.02c-1.21.92-2 2.35-2 3.98 0 2.76 2.24 5 5 5s5-2.24 5-5c0-1.63-.79-3.06-2-3.98ZM11 4.5h2v2.1c-.32-.06-.66-.1-1-.1-.34 0-.68.04-1 .1V4.5Zm1 10c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3Z" />
  </Svg>
)

export default Icon
