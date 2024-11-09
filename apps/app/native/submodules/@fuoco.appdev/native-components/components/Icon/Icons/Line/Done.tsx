import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m8.8 15.9-4.2-4.2-1.4 1.4 5.6 5.6 12-12-1.4-1.4L8.8 15.9Z" />
  </Svg>
)

export default Icon
