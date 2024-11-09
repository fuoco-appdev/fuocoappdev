import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m10.5 8.5 1.42 1.42-3.59 3.58h9.17v-10h2v12H8.33l3.59 3.58-1.42 1.42-6-6 6-6Z" />
  </Svg>
)

export default Icon
