import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m9.995 11-.94 2.06-2.06.94 2.06.94.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06Zm8.01-7 2 4h-3l-2-4h-2l2 4h-3l-2-4h-2l2 4h-3l-2-4h-1c-1.1 0-1.99.9-1.99 2l-.01 12c0 1.1.9 2 2 2h16c1.1 0 1.99-.9 1.99-2V4h-3.99Zm2 14h-16V6.47L5.765 10h10.23l-.63 1.37-1.37.63 1.37.63.63 1.37.63-1.37 1.37-.63-1.37-.63-.63-1.37h4.01v8Z" />
  </Svg>
)

export default Icon
