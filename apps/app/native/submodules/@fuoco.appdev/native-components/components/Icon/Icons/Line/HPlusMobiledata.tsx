import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M11 11H5V7H3v10h2v-4h6v4h2V7h-2v4Zm10 0h-2V9h-2v2h-2v2h2v2h2v-2h2v-2Z" />
  </Svg>
)

export default Icon
