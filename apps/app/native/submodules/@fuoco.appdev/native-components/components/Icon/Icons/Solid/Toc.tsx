import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M3 9h14V7H3v2Z" />
    <Path d="M3 13h14v-2H3v2Z" />
    <Path d="M3 17h14v-2H3v2Z" />
    <Path d="M19 17h2v-2h-2v2Z" />
    <Path d="M19 7v2h2V7h-2Z" />
    <Path d="M19 13h2v-2h-2v2Z" />
  </Svg>
)

export default Icon
