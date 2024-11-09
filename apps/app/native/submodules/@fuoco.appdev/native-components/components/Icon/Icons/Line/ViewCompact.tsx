import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M2.5 5v14h19V5h-19Zm2 2h15v4h-15V7Zm0 10v-4h4v4h-4Zm6 0v-4h9v4h-9Z" />
  </Svg>
)

export default Icon
