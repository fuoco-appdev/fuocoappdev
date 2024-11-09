import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M8.5 8.62v6.76L5.12 12 8.5 8.62ZM10 5l-7 7 7 7V5Zm4 0v14l7-7-7-7Z" />
  </Svg>
)

export default Icon
