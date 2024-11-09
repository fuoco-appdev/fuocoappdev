import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M3 19h16v2H3v-2ZM19 3H3v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2a2 2 0 0 0 2-2V5c0-1.11-.89-2-2-2Zm-4 10c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V5h10v8Zm4-5h-2V5h2v3Z" />
  </Svg>
)

export default Icon
