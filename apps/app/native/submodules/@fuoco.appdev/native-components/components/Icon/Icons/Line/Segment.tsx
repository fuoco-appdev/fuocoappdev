import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M9 18h12v-2H9v2ZM3 6v2h18V6H3Zm6 7h12v-2H9v2Z" />
  </Svg>
)

export default Icon
