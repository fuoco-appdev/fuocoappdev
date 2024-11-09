import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M13.5 8.5h-11v2h11v-2Z" />
    <Path d="M13.5 4.5h-11v2h11v-2Z" />
    <Path d="M9.5 12.5h-7v2h7v-2Z" />
    <Path d="M15.5 11.5v8l6-4-6-4Z" />
  </Svg>
)

export default Icon
