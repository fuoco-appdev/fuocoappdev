import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M5.54 8.46 2 12l3.54 3.54 1.76-1.77L5.54 12l1.76-1.77-1.76-1.77Zm6.46 10-1.77-1.76-1.77 1.76L12 22l3.54-3.54-1.77-1.76L12 18.46Zm6.46-10-1.76 1.77L18.46 12l-1.76 1.77 1.76 1.77L22 12l-3.54-3.54Zm-10-2.92 1.77 1.76L12 5.54l1.77 1.76 1.77-1.76L12 2 8.46 5.54Z" />
    <Path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
  </Svg>
)

export default Icon
