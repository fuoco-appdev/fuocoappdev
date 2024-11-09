import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M6.99 11 3 15l3.99 4v-3H14v-2H6.99v-3ZM21 9l-3.99-4v3H10v2h7.01v3L21 9Z" />
  </Svg>
)

export default Icon
