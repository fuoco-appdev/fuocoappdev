import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m17.835 3.87-1.78-1.77-9.89 9.9 9.9 9.9 1.77-1.77L9.705 12l8.13-8.13Z" />
  </Svg>
)

export default Icon
