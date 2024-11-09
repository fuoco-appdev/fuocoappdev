import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M15.5 22c1.05 0 2.05-.16 3-.46-4.06-1.27-7-5.06-7-9.54 0-4.48 2.94-8.27 7-9.54-.95-.3-1.95-.46-3-.46-5.52 0-10 4.48-10 10s4.48 10 10 10Z" />
  </Svg>
)

export default Icon
