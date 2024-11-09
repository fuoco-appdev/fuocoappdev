import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M3 13h2v-2H3v2Zm0 4h2v-2H3v2Zm2 4v-2H3a2 2 0 0 0 2 2ZM3 9h2V7H3v2Zm12 12h2v-2h-2v2Zm4-18H9a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm0 12H9V5h10v10Zm-8 6h2v-2h-2v2Zm-4 0h2v-2H7v2Z" />
  </Svg>
)

export default Icon
