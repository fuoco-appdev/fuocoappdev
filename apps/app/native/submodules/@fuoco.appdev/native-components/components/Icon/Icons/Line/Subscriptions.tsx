import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M4 6h16v2H4V6Zm2-4h12v2H6V2Zm14 8H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2Zm0 10H4v-8h16v8Zm-10-7.27v6.53L16 16l-6-3.27Z" />
  </Svg>
)

export default Icon
