import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M20 6.5h-4v-2c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19.5c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2v-11c0-1.11-.89-2-2-2Zm-6 0h-4v-2h4v2Z" />
  </Svg>
)

export default Icon
