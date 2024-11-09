import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M2.5 9v2h19V9h-19Zm0 6h5v-2h-5v2Zm7 0h5v-2h-5v2Zm7 0h5v-2h-5v2Z" />
  </Svg>
)

export default Icon
