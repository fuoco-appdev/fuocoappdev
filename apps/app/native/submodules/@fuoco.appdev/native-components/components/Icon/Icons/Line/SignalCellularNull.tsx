import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M20 6.83V20H6.83L20 6.83ZM22 2 2 22h20V2Z" />
  </Svg>
)

export default Icon
