import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M20 5h-3.17L15 3H9L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2ZM9.88 5h4.24l1.83 2H20v12H4V7h4.05" />
    <Path d="M15 12H9V9.5L5.5 13 9 16.5V14h6v2.5l3.5-3.5L15 9.5V12Z" />
  </Svg>
)

export default Icon
