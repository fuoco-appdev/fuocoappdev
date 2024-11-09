import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M10 13H8v-2h2v2Zm6-2h-2v2h2v-2Zm5 8v2H3v-2h1V5c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v14h1ZM11 5H6v14h5V5Zm7 0h-5v14h5V5Z" />
  </Svg>
)

export default Icon
