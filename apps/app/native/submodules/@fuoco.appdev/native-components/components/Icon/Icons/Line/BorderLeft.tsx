import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M11 21h2v-2h-2v2Zm0-4h2v-2h-2v2Zm0-12h2V3h-2v2Zm0 4h2V7h-2v2Zm0 4h2v-2h-2v2Zm-4 8h2v-2H7v2ZM7 5h2V3H7v2Zm0 8h2v-2H7v2Zm-4 8h2V3H3v18ZM19 9h2V7h-2v2Zm-4 12h2v-2h-2v2Zm4-4h2v-2h-2v2Zm0-14v2h2V3h-2Zm0 10h2v-2h-2v2Zm0 8h2v-2h-2v2Zm-4-8h2v-2h-2v2Zm0-8h2V3h-2v2Z" />
  </Svg>
)

export default Icon
