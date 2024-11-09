import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5Zm11 7V8a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1v1H9v2h3a2 2 0 0 0 2-2Zm-3-3V8h1v1h-1Zm10-8H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2Zm0 8h-2V7h-2v2h-2v2h2v2h2v-2h2v6H7V3h14v6Z" />
  </Svg>
)

export default Icon
