import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M18 2h-8L4 8v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2Zm0 2v16H6V8.83L10.83 4H18ZM7 17h2v2H7v-2Zm8 0h2v2h-2v-2Zm-8-6h2v4H7v-4Zm4 4h2v4h-2v-4Zm0-4h2v2h-2v-2Zm4 0h2v4h-2v-4Z" />
  </Svg>
)

export default Icon
