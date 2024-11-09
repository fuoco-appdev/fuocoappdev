import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M22 2v2H2V2h20ZM7 10.5v3h10v-3H7ZM2 20v2h20v-2H2Z" />
  </Svg>
)

export default Icon
