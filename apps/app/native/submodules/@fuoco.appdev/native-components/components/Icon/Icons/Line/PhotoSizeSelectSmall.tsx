import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M23 15h-2v2h2v-2Zm0-4h-2v2h2v-2Zm0 8h-2v2c1 0 2-1 2-2ZM15 3h-2v2h2V3Zm8 4h-2v2h2V7Zm-2-4v2h2c0-1-1-2-2-2ZM3 21h8v-6H1v4c0 1.1.9 2 2 2ZM3 7H1v2h2V7Zm12 12h-2v2h2v-2Zm4-16h-2v2h2V3Zm0 16h-2v2h2v-2ZM3 3C2 3 1 4 1 5h2V3Zm0 8H1v2h2v-2Zm8-8H9v2h2V3ZM7 3H5v2h2V3Z" />
  </Svg>
)

export default Icon
