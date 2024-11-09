import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M10 2c0 1.66-1.34 3-3 3-.55 0-1 .45-1 1H4c0-1.66 1.34-3 3-3 .55 0 1-.45 1-1h2Zm2 2L6 8.58V7H4v3.11L1 12.4l1.21 1.59L4 12.62V22h16v-9.38l1.79 1.36L23 12.4 12 4Zm1.94 4h-3.89L12 6.52 13.94 8Zm-6.5 2h9.12L18 11.1v.9H6v-.9L7.44 10ZM18 14v2H6v-2h12ZM6 20v-2h12v2H6Z" />
  </Svg>
)

export default Icon
