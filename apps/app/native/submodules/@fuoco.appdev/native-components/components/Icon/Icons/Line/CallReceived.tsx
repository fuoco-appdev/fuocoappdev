import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19.5 5.91 18.09 4.5 6.5 16.09V9.5h-2v10h10v-2H7.91L19.5 5.91Z" />
  </Svg>
)

export default Icon
