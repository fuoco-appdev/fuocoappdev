import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M17.5 4V3c0-.55-.45-1-1-1h-12c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6h1v4h-10v11c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-9h8V4h-3Zm-2 2h-10V4h10v2Z" />
  </Svg>
)

export default Icon
