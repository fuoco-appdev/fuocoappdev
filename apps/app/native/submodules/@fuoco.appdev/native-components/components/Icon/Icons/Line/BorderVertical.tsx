import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M3 9h2V7H3v2Zm0-4h2V3H3v2Zm4 16h2v-2H7v2Zm0-8h2v-2H7v2Zm-4 0h2v-2H3v2Zm0 8h2v-2H3v2Zm0-4h2v-2H3v2ZM7 5h2V3H7v2Zm12 12h2v-2h-2v2Zm-8 4h2V3h-2v18Zm8 0h2v-2h-2v2Zm0-8h2v-2h-2v2Zm0-10v2h2V3h-2Zm0 6h2V7h-2v2Zm-4-4h2V3h-2v2Zm0 16h2v-2h-2v2Zm0-8h2v-2h-2v2Z" />
  </Svg>
)

export default Icon
