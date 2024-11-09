import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M21 11.01 3 11v2h18v-1.99ZM3 16h12v2H3v-2ZM21 6H3v2.01L21 8V6Z" />
  </Svg>
)

export default Icon
