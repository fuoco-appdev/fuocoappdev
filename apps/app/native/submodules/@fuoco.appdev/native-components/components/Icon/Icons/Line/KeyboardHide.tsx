import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2Zm0 12H4V4h16v10Zm-9-9h2v2h-2V5Zm0 3h2v2h-2V8ZM8 5h2v2H8V5Zm0 3h2v2H8V8ZM5 8h2v2H5V8Zm0-3h2v2H5V5Zm3 6h8v2H8v-2Zm6-3h2v2h-2V8Zm0-3h2v2h-2V5Zm3 3h2v2h-2V8Zm0-3h2v2h-2V5Zm-5 17 4-4H8l4 4Z" />
  </Svg>
)

export default Icon
