import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19 3H5c-1.1 0-2 .9-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm0 16H5v-3h3.56c.69 1.19 1.97 2 3.45 2 1.48 0 2.75-.81 3.45-2H19v3Zm0-5h-4.99c0 1.1-.9 2-2 2s-2-.9-2-2H5V5h14v9Z" />
  </Svg>
)

export default Icon
