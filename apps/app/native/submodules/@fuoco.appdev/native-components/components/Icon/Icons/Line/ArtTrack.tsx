import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M22 13h-8v-2h8v2Zm0-6h-8v2h8V7Zm-8 10h8v-2h-8v2Zm-2-8v6c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2Zm-1.5 6-2.25-3-1.75 2.26-1.25-1.51L3.5 15h7Z" />
  </Svg>
)

export default Icon
