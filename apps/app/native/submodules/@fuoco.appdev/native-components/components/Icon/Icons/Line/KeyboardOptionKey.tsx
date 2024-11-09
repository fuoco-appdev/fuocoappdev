import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M21 5h-6v2h6V5Z" />
    <Path d="M9 5H3v2h4.85l6.92 12H21v-2h-5.07L9 5Z" />
  </Svg>
)

export default Icon
