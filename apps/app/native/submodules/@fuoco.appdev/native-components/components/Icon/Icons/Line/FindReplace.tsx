import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M10.255 5.255c1.38 0 2.63.56 3.54 1.46l-2.54 2.54h6v-6l-2.05 2.05a6.976 6.976 0 0 0-4.95-2.05c-3.53 0-6.43 2.61-6.92 6h2.02a5 5 0 0 1 4.9-4Zm5.64 9.14a6.89 6.89 0 0 0 1.28-3.14h-2.02a5 5 0 0 1-4.9 4c-1.38 0-2.63-.56-3.54-1.46l2.54-2.54h-6v6l2.05-2.05a6.976 6.976 0 0 0 4.95 2.05c1.55 0 2.98-.51 4.14-1.36l4.86 4.85 1.49-1.49-4.85-4.86Z" />
  </Svg>
)

export default Icon
