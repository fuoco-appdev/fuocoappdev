import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M3 21h18v-2H3v2Zm6-4h12v-2H9v2Zm-6-4h18v-2H3v2Zm6-4h12V7H9v2ZM3 3v2h18V3H3Z" />
  </Svg>
)

export default Icon
