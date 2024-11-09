import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M20 7v10H4V7h16Zm0-2H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2Zm-9 3h2v2h-2V8Zm0 3h2v2h-2v-2ZM8 8h2v2H8V8Zm0 3h2v2H8v-2Zm-3 0h2v2H5v-2Zm0-3h2v2H5V8Zm3 6h8v2H8v-2Zm6-3h2v2h-2v-2Zm0-3h2v2h-2V8Zm3 3h2v2h-2v-2Zm0-3h2v2h-2V8Z" />
  </Svg>
)

export default Icon
