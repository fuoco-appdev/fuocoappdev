import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M10.5 13V9c0-.55-.45-1-1-1h-4V6h5V4H8V3H6v1H4.5c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h4v2h-5v2H6v1h2v-1h1.5c.55 0 1-.45 1-1Z" />
    <Path d="m19.09 12.52-5.66 5.65-2.83-2.83-1.41 1.42L13.43 21l7.07-7.07-1.41-1.41Z" />
  </Svg>
)

export default Icon
