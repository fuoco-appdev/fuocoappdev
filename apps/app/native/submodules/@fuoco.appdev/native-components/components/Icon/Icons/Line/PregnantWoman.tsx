import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M9 4c0-1.11.89-2 2-2 1.11 0 2 .89 2 2 0 1.11-.89 2-2 2-1.11 0-2-.89-2-2Zm7 9a3.285 3.285 0 0 0-2-3c0-1.66-1.34-3-3-3s-3 1.34-3 3v7h2v5h3v-5h3v-4Z" />
  </Svg>
)

export default Icon
