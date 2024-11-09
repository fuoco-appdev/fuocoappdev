import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12.5 11v2h2v2h-4V9h6c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-4h-4Zm11 0h-2V9h-2v2h-2v2h2v2h2v-2h2v-2Zm-17-4h-2v5h-2V7h-2v7h4v3h2v-3h1v-2h-1V7Z" />
  </Svg>
)

export default Icon
