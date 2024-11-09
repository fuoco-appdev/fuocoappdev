import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19 7.01h-8v6h8v-6Zm-2 4h-4v-2h4v2Zm4-8H3c-1.1 0-2 .9-2 2v14c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98v-14c0-1.1-.9-2-2-2Zm0 16.01H3V4.99h18v14.03Z" />
  </Svg>
)

export default Icon
