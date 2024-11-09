import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M10 20h4V4h-4v16Zm-6 0h4v-8H4v8ZM16 9v11h4V9h-4Z" />
  </Svg>
)

export default Icon
