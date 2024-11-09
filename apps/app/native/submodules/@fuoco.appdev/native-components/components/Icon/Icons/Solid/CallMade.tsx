import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5H9Z" />
  </Svg>
)

export default Icon
