import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2Zm0 14H5.17L4 17.17V4h16v12ZM6 12h2v2H6v-2Zm0-3h2v2H6V9Zm0-3h2v2H6V6Zm4 6h5v2h-5v-2Zm0-3h8v2h-8V9Zm0-3h8v2h-8V6Z" />
  </Svg>
)

export default Icon
