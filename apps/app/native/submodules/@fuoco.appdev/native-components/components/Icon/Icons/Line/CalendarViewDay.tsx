import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M3 16.5h18v2H3v-2Zm16-5v1H5v-1h14Zm2-2H3v5h18v-5Zm-18-4h18v2H3v-2Z" />
  </Svg>
)

export default Icon
