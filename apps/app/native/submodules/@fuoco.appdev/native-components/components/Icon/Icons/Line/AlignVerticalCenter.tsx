import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M22.08 11h-5V6h-3v5h-4V3h-3v8H1.92v2h5.16v8h3v-8h4v5h3v-5h5v-2Z" />
  </Svg>
)

export default Icon
