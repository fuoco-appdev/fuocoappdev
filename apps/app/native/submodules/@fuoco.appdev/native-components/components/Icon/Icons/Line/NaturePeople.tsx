import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M4.415 10.915a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
    <Path d="M22.085 9.085c0-3.87-3.13-7-7-7s-7 3.13-7 7a6.98 6.98 0 0 0 5.83 6.89v3.94h-8v-3h1v-4c0-.55-.45-1-1-1h-3c-.55 0-1 .45-1 1v4h1v5h16v-2h-3v-3.88a7 7 0 0 0 6.17-6.95Zm-7 5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5Z" />
  </Svg>
)

export default Icon
