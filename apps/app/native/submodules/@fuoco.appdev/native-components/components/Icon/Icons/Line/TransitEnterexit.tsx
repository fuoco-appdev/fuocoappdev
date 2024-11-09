import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M16 18H6V8h3v4.77L15.98 6 18 8.03 11.15 15H16v3Z" />
  </Svg>
)

export default Icon
