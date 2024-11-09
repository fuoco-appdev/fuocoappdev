import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm0 16H5v-4.58l.99.99 4-4 4 4 4-3.99L19 12.43V19Zm0-9.41-1.01-1.01-4 4.01-4-4-4 4-.99-1V5h14v4.59Z" />
  </Svg>
)

export default Icon
