import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19 3H5L2 9l10 12L22 9l-3-6ZM9.62 8l1.5-3h1.76l1.5 3H9.62ZM11 10v6.68L5.44 10H11Zm2 0h5.56L13 16.68V10Zm6.26-2h-2.65l-1.5-3h2.65l1.5 3ZM6.24 5h2.65l-1.5 3H4.74l1.5-3Z" />
  </Svg>
)

export default Icon
