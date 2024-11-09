import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M22 8V2L2 22h16V8h4Z" />
    <Path d="M20 22h2v-2h-2v2Z" />
    <Path d="M20 10v8h2v-8h-2Z" />
  </Svg>
)

export default Icon
