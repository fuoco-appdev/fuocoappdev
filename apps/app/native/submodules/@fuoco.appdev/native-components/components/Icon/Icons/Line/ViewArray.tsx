import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M15 7v10H9V7h6Zm6-2h-3v14h3V5Zm-4 0H7v14h10V5ZM6 5H3v14h3V5Z" />
  </Svg>
)

export default Icon
