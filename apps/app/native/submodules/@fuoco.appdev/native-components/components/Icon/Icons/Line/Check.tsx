import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m8.795 15.875-4.17-4.17-1.42 1.41 5.59 5.59 12-12-1.41-1.41-10.59 10.58Z" />
  </Svg>
)

export default Icon
