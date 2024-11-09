import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m17.27 6.73-4.24 10.13-1.64-4.25-.82-.32-3.43-1.33 10.13-4.23ZM21 3 3 10.53v.98l6.84 2.65L12.48 21h.98L21 3Z" />
  </Svg>
)

export default Icon
