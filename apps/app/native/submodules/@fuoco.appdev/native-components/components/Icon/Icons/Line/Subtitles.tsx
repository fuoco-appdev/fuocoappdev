import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 14H4V6h16v12ZM6 10h2v2H6v-2Zm0 4h8v2H6v-2Zm10 0h2v2h-2v-2Zm-6-4h8v2h-8v-2Z" />
  </Svg>
)

export default Icon
