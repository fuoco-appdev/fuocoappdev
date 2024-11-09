import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M14 8.83 17.17 12 14 15.17V14H6v-4h8V8.83ZM12 4v4H4v8h8v4l8-8-8-8Z" />
  </Svg>
)

export default Icon
