import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12 2.5c-4 0-8 .5-8 4V16c0 .95.38 1.81 1 2.44v2.06c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-2.06c.62-.63 1-1.49 1-2.44V6.5c0-3.5-3.58-4-8-4Zm0 2c3.71 0 5.13.46 5.67 1H6.43c.6-.52 2.05-1 5.57-1Zm6 11c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2v-3h12v3Zm0-5H6v-3h12v3Z" />
    <Path d="M8.5 16.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
    <Path d="M15.5 16.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
  </Svg>
)

export default Icon
