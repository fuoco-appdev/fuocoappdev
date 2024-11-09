import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M4 15h16v-2H4v2Zm0 4h16v-2H4v2Zm0-8h16V9H4v2Zm0-6v2h16V5H4Z" />
  </Svg>
)

export default Icon
