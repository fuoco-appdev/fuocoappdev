import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M3 18h13v-2H3v2Zm0-5h10v-2H3v2Zm0-7v2h13V6H3Zm18 9.59L17.42 12 21 8.41 19.59 7l-5 5 5 5L21 15.59Z" />
  </Svg>
)

export default Icon
