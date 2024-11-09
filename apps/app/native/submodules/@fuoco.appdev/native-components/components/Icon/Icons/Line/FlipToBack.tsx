import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M9 7H7v2h2V7Zm0 4H7v2h2v-2Zm0-8a2 2 0 0 0-2 2h2V3Zm4 12h-2v2h2v-2Zm6-12v2h2c0-1.1-.9-2-2-2Zm-6 0h-2v2h2V3ZM9 17v-2H7a2 2 0 0 0 2 2Zm10-4h2v-2h-2v2Zm0-4h2V7h-2v2Zm0 8c1.1 0 2-.9 2-2h-2v2ZM5 7H3v12a2 2 0 0 0 2 2h12v-2H5V7Zm10-2h2V3h-2v2Zm0 12h2v-2h-2v2Z" />
  </Svg>
)

export default Icon
