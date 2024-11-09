import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M16.95 12h2l-7-10L5 12h1.95l-3.9 6h6.92v4h3.95v-4h7.03l-4-6ZM6.74 16l3.9-6H8.83l3.13-4.5 3.15 4.5h-1.9l4 6H6.74Z" />
  </Svg>
)

export default Icon
