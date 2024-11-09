import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m21.43 1-8.31 8.31 8.31 8.3V1ZM5.34 4.36 3.93 5.77l6.36 6.37L1.43 21h17.73l2 2 1.41-1.41L5.34 4.36Z" />
  </Svg>
)

export default Icon
