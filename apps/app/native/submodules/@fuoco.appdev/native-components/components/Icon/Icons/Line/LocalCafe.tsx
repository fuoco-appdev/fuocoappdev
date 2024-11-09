import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M16 5v8c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V5h10Zm4-2H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2Zm-2 5V5h2v3h-2Zm2 11H2v2h18v-2Z" />
  </Svg>
)

export default Icon
