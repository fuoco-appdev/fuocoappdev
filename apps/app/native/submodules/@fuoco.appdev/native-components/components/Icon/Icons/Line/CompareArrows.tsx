import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M9.01 14H2v2h7.01v3L13 15l-3.99-4v3Zm5.98-1v-3H22V8h-7.01V5L11 9l3.99 4Z" />
  </Svg>
)

export default Icon
