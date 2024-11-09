import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M18.5 5V3h-11v13h-2v2h2v3h2v-3h4v-2h-4v-3h8v-2h-8V5h9Z" />
  </Svg>
)

export default Icon
