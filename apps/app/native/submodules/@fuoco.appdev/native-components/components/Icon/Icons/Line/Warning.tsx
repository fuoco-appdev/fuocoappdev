import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M1 21.5h22l-11-19-11 19Zm12-3h-2v-2h2v2Zm0-4h-2v-4h2v4Z" />
  </Svg>
)

export default Icon
