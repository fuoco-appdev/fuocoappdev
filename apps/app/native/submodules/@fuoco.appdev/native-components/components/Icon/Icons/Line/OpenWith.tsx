import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M10 9h4V6h3l-5-5-5 5h3v3Zm-1 1H6V7l-5 5 5 5v-3h3v-4Zm14 2-5-5v3h-3v4h3v3l5-5Zm-9 3h-4v3H7l5 5 5-5h-3v-3Z" />
  </Svg>
)

export default Icon
