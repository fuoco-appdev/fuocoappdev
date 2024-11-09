import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19 15v2H5v-2h14Zm2-10H3v2h18V5Zm0 4H3v2h18V9Zm0 4H3v6h18v-6Z" />
  </Svg>
)

export default Icon
