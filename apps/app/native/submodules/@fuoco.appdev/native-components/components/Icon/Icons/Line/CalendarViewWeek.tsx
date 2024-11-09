import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm-7 2h2.5v12H13V6Zm-2 12H8.5V6H11v12ZM4 6h2.5v12H4V6Zm16 12h-2.5V6H20v12Z" />
  </Svg>
)

export default Icon
