import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m12 6.49 7.53 13.01H4.47L12 6.49Zm0-3.99-11 19h22l-11-19Zm1 14h-2v2h2v-2Zm0-6h-2v4h2v-4Z" />
  </Svg>
)

export default Icon
