import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M11 7h2v2h-2V7Zm0 4h2v6h-2v-6Zm6-9.99L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99ZM17 21H7v-1h10v1Zm0-3H7V6h10v12ZM7 4V3h10v1H7Z" />
  </Svg>
)

export default Icon
