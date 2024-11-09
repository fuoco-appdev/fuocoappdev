import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M3 21h2v-2H3v2ZM5 7H3v2h2V7ZM3 17h2v-2H3v2Zm4 4h2v-2H7v2ZM5 3H3v2h2V3Zm4 0H7v2h2V3Zm8 0h-2v2h2V3Zm-4 4h-2v2h2V7Zm0-4h-2v2h2V3Zm6 14h2v-2h-2v2Zm-8 4h2v-2h-2v2Zm-8-8h18v-2H3v2ZM19 3v2h2V3h-2Zm0 6h2V7h-2v2Zm-8 8h2v-2h-2v2Zm4 4h2v-2h-2v2Zm4 0h2v-2h-2v2Z" />
  </Svg>
)

export default Icon
