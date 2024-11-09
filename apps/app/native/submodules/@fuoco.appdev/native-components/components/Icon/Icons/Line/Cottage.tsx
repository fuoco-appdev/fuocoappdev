import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12 4 6 8.58V7H4v3.11L1 12.4l1.21 1.59L4 12.62V22h16v-9.38l1.79 1.36L23 12.4 12 4Zm6 16h-5v-4h-2v4H6v-8.9l6-4.58 6 4.58V20ZM10 2c0 1.66-1.34 3-3 3-.55 0-1 .45-1 1H4c0-1.66 1.34-3 3-3 .55 0 1-.45 1-1h2Z" />
  </Svg>
)

export default Icon
