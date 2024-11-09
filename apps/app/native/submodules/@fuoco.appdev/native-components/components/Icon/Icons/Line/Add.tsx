import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z" />
  </Svg>
)

export default Icon
