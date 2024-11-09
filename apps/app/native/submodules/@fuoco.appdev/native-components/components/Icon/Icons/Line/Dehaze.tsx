import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M2 16v2h20v-2H2Zm0-5v2h20v-2H2Zm0-5v2h20V6H2Z" />
  </Svg>
)

export default Icon
