import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M18 2h-8L4.02 8 4 20c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2Zm0 18H6V8.83L10.83 4H18v16Z" />
    <Path d="M13 15h-2v2h2v-2Z" />
    <Path d="M13 8h-2v5h2V8Z" />
  </Svg>
)

export default Icon
