import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M4 8h4V4H4v4Zm6 12h4v-4h-4v4Zm-6 0h4v-4H4v4Zm0-6h4v-4H4v4Zm6 0h4v-4h-4v4Zm6-10v4h4V4h-4Zm-6 4h4V4h-4v4Zm6 6h4v-4h-4v4Zm0 6h4v-4h-4v4Z" />
  </Svg>
)

export default Icon
