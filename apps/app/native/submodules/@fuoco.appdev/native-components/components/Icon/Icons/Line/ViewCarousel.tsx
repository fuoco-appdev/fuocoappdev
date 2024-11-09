import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M2 7h4v10H2V7Zm5 12h10V5H7v14ZM9 7h6v10H9V7Zm9 0h4v10h-4V7Z" />
  </Svg>
)

export default Icon
