import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M20 5h-3.17L15 3H9L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2Zm0 14H4V7h4.05l.59-.65L9.88 5h4.24l1.24 1.35.59.65H20v12ZM9 13c0-1.66 1.34-3 3-3h3.98c-.92-1.21-2.35-2-3.98-2a5.002 5.002 0 0 0-4.9 6h2.08c-.11-.31-.18-.65-.18-1Zm6 0c0 1.66-1.34 3-3 3H8.02c.92 1.21 2.35 2 3.98 2a5.002 5.002 0 0 0 4.9-6h-2.08c.11.31.18.65.18 1Z" />
  </Svg>
)

export default Icon
