import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M4 22H2V2h2v20ZM22 7H6v3h16V7Zm-6 7H6v3h10v-3Z" />
  </Svg>
)

export default Icon
