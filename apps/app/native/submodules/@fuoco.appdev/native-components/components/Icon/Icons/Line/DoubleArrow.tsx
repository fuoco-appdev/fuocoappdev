import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M15.25 5h-4.5l5 7-5 7h4.5l5-7-5-7Z" />
    <Path d="M8.25 5h-4.5l5 7-5 7h4.5l5-7-5-7Z" />
  </Svg>
)

export default Icon
