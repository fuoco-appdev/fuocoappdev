import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M21.9 20.48 3.52 2.1 2.1 3.51l8.23 8.23 1.38 1.55v5h-5v2h12v-.17l1.78 1.78 1.41-1.42Zm-8.19-2.19v-3.17l3.17 3.17h-3.17Zm-5.17-14-2-2h15.17v2l-6.2 6.97-1.42-1.42 1.39-1.55h-2.94l-2-2h6.74l1.78-2H8.54Z" />
  </Svg>
)

export default Icon
