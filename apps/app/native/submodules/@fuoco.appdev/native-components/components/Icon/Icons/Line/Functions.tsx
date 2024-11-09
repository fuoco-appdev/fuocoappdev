import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M18 4H6v2l6.5 6L6 18v2h12v-3h-7l5-5-5-5h7V4Z" />
  </Svg>
)

export default Icon
