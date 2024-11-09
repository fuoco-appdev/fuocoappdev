import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M18 2h-8L4 8v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2Zm0 18H6V8.83L10.83 4H18v16ZM9 7h2v4H9V7Zm3 0h2v4h-2V7Zm3 0h2v4h-2V7Z" />
  </Svg>
)

export default Icon
