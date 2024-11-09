import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M16 9v10H8V9h8Zm-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1ZM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7Z" />
  </Svg>
)

export default Icon
