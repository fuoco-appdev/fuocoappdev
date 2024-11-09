import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M18 6V4h2V2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14v-2h-4.03A4.966 4.966 0 0 0 18 16v-5H8v5c0 1.64.81 3.09 2.03 4H6V4h2v2c0 .55.45 1 1 1h8c.55 0 1-.45 1-1Zm-8 10v-3h6v3c0 1.65-1.35 3-3 3s-3-1.35-3-3Z" />
    <Path d="M13 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
  </Svg>
)

export default Icon
