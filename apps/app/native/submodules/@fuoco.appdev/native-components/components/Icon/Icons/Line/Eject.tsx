import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M5 17h14v2H5v-2Zm7-12L5.33 15h13.34L12 5Zm0 3.6 2.93 4.4H9.07L12 8.6Z" />
  </Svg>
)

export default Icon
