import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M11 6H9V4h2v2Zm4-2h-2v2h2V4ZM9 14h2v-2H9v2Zm10-4V8h-2v2h2Zm0 4v-2h-2v2h2Zm-6 0h2v-2h-2v2Zm6-10h-2v2h2V4Zm-6 4V6h-2v2h2Zm-6 2V8h2V6H7V4H5v16h2v-8h2v-2H7Zm8 2h2v-2h-2v2Zm-4-2v2h2v-2h-2ZM9 8v2h2V8H9Zm4 2h2V8h-2v2Zm2-4v2h2V6h-2Z" />
  </Svg>
)

export default Icon
