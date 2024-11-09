import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M3 21h18v-2H3v2ZM3 8v8l4-4-4-4Zm8 9h10v-2H11v2ZM3 3v2h18V3H3Zm8 6h10V7H11v2Zm0 4h10v-2H11v2Z" />
  </Svg>
)

export default Icon
