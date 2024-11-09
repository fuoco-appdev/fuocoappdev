import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2Zm16 14H5V5h14v14ZM11 7h2v2h-2V7ZM7 7h2v2H7V7Zm8 0h2v2h-2V7Z" />
  </Svg>
)

export default Icon
