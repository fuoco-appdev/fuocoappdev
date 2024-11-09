import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M8 19h3v4h2v-4h3l-4-4-4 4Zm8-14h-3V1h-2v4H8l4 4 4-4ZM4 11v2h16v-2H4Z" />
  </Svg>
)

export default Icon
