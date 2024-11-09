import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M2.5 19.5h19v2h-19v-2Zm16.84-3.15c.8.21 1.62-.26 1.84-1.06.21-.8-.26-1.62-1.06-1.84l-5.31-1.42-2.76-9.02-1.93-.51v8.28L5.15 9.45l-.93-2.32-1.45-.39v5.17l16.57 4.44Z" />
  </Svg>
)

export default Icon
