import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M6 22h16V5.97L6 22Z" />
    <Path d="m3.93 5.93 1.29 1.29c3.19-3.19 8.38-3.19 11.57 0l1.29-1.29c-3.91-3.91-10.25-3.91-14.15 0Z" />
    <Path d="M9.07 11.07 11 13l1.93-1.93a2.74 2.74 0 0 0-3.86 0Z" />
    <Path d="m6.5 8.5 1.29 1.29c1.77-1.77 4.65-1.77 6.43 0L15.5 8.5a6.374 6.374 0 0 0-9 0Z" />
  </Svg>
)

export default Icon
