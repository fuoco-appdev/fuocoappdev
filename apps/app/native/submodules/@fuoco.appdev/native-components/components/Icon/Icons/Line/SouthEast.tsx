import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19.5 9.5h-2v6.59L5.91 4.5 4.5 5.91 16.09 17.5H9.5v2h10v-10Z" />
  </Svg>
)

export default Icon
