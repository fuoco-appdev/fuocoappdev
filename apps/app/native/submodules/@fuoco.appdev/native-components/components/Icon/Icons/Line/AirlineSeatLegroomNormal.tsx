import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M4.5 12V3h-2v9c0 2.76 2.24 5 5 5h6v-2h-6c-1.66 0-3-1.34-3-3ZM20 18h-1.5v-7c0-1.1-.9-2-2-2h-5V3h-6v8c0 1.65 1.35 3 3 3h7v7H20c.83 0 1.5-.67 1.5-1.5S20.83 18 20 18Z" />
  </Svg>
)

export default Icon
