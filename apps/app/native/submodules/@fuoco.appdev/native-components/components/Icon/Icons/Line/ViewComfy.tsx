import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M2.5 5v14h19V5h-19Zm17 4h-2.25V7h2.25v2ZM8.75 11H11v2H8.75v-2Zm-2 2H4.5v-2h2.25v2ZM11 9H8.75V7H11v2Zm2-2h2.25v2H13V7Zm-2 8v2H8.75v-2H11Zm2 0h2.25v2H13v-2Zm0-2v-2h2.25v2H13Zm4.25-2h2.25v2h-2.25v-2ZM6.75 7v2H4.5V7h2.25ZM4.5 15h2.25v2H4.5v-2Zm12.75 2v-2h2.25v2h-2.25Z" />
  </Svg>
)

export default Icon
