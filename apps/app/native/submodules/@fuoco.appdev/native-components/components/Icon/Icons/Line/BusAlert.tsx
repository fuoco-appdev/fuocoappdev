import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M6 17.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
    <Path d="M13 17.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
    <Path d="M3.5 11.5v-3h7.29c-.19-.63-.29-1.3-.29-2H3.93c.83-.71 2.98-1.09 6.65-.98.1-.7.3-1.37.59-1.99C2.47 3.17 1.5 5.52 1.5 7.5V17c0 .95.38 1.81 1 2.44v2.06c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-2.06c.62-.63 1-1.49 1-2.44v-3.5c-1.91 0-3.63-.76-4.89-2H3.5Zm12 5c0 1.1-.9 2-2 2h-8c-1.1 0-2-.9-2-2v-3h12v3Z" />
    <Path d="M17.5 1.5c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5Zm.5 8h-1v-1h1v1Zm0-2h-1v-4h1v4Z" />
  </Svg>
)

export default Icon
