import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M14.5 19.5v-2H7.91L19.5 5.91 18.09 4.5 6.5 16.09V9.5h-2v10h10Z" />
  </Svg>
)

export default Icon
