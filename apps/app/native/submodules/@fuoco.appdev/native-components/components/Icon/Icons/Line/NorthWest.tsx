import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M4.5 14.5h2V7.91L18.09 19.5l1.41-1.41L7.91 6.5h6.59v-2h-10v10Z" />
  </Svg>
)

export default Icon
