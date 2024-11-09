import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19 19h2v2h-2v-2Zm0-2h2v-2h-2v2ZM3 13h2v-2H3v2Zm0 4h2v-2H3v2Zm0-8h2V7H3v2Zm0-4h2V3H3v2Zm4 0h2V3H7v2Zm8 16h2v-2h-2v2Zm-4 0h2v-2h-2v2Zm4 0h2v-2h-2v2Zm-8 0h2v-2H7v2Zm-4 0h2v-2H3v2ZM21 8c0-2.76-2.24-5-5-5h-5v2h5c1.65 0 3 1.35 3 3v5h2V8Z" />
  </Svg>
)

export default Icon
