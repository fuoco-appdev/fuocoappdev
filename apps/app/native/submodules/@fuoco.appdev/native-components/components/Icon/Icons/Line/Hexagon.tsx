import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M17.2 3H6.8l-5.2 9 5.2 9h10.4l5.2-9-5.2-9Zm-1.15 16h-8.1l-4.04-7 4.04-7h8.09l4.04 7-4.03 7Z" />
  </Svg>
)

export default Icon
