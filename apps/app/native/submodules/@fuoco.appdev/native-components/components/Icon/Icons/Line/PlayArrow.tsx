import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M8.5 8.64 13.77 12 8.5 15.36V8.64ZM6.5 5v14l11-7-11-7Z" />
  </Svg>
)

export default Icon
