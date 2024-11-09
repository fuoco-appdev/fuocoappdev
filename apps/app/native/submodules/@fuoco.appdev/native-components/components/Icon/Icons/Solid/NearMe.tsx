import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M21 3 3 10.53v.98l6.84 2.65L12.48 21h.98L21 3Z" />
  </Svg>
)

export default Icon
