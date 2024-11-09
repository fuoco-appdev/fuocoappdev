import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M22 22H2v-2h20v2ZM10 2H7v16h3V2Zm7 6h-3v10h3V8Z" />
  </Svg>
)

export default Icon
