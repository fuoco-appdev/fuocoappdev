import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M22 2v2H2V2h20ZM7 22h3V6H7v16Zm7-6h3V6h-3v10Z" />
  </Svg>
)

export default Icon
