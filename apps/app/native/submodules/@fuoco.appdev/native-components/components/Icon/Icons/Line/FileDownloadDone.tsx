import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M20.13 5.41 18.72 4l-9.19 9.19-4.25-4.24-1.41 1.41 5.66 5.66 10.6-10.61Z" />
    <Path d="M19 18H5v2h14v-2Z" />
  </Svg>
)

export default Icon
