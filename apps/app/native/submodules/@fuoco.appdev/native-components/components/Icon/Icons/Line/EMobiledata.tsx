import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M16 9V7H8v10h8v-2h-6v-2h6v-2h-6V9h6Z" />
  </Svg>
)

export default Icon
