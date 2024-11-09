import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M20 2h2v20h-2V2ZM2 10h16V7H2v3Zm6 7h10v-3H8v3Z" />
  </Svg>
)

export default Icon
