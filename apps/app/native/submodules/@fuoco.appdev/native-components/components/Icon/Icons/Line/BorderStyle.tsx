import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M15 21h2v-2h-2v2Zm4 0h2v-2h-2v2ZM7 21h2v-2H7v2Zm4 0h2v-2h-2v2Zm8-4h2v-2h-2v2Zm0-4h2v-2h-2v2ZM3 3v18h2V5h16V3H3Zm16 6h2V7h-2v2Z" />
  </Svg>
)

export default Icon
