import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M14 5v14h-4V5h4Zm6-2h-2v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3Zm-4 6V7h2v2h-2ZM6 9V7h2v2H6Zm10 4v-2h2v2h-2ZM6 13v-2h2v2H6Zm10 4v-2h2v2h-2ZM6 17v-2h2v2H6Z" />
  </Svg>
)

export default Icon
