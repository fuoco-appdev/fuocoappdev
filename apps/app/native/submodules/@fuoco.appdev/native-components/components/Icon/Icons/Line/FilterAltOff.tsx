import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m17.66 5.29-3.57 4.55 1.43 1.43C16.55 9.96 20.5 4.9 20.5 4.9a.998.998 0 0 0-.79-1.61H7.54l2 2h8.12Z" />
    <Path d="M3.52 2.1 2.1 3.51l8.61 8.78v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2.17l5.78 5.78 1.41-1.41L3.52 2.1Z" />
  </Svg>
)

export default Icon
