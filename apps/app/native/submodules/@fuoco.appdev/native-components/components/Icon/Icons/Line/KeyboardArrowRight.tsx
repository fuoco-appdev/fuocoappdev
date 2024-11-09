import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m8.295 16.59 4.58-4.59-4.58-4.59L9.705 6l6 6-6 6-1.41-1.41Z" />
  </Svg>
)

export default Icon
