import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M6 16h12V8H6v8Zm2-6h8v4H8v-4Zm-4 5H2v3c0 1.1.9 2 2 2h3v-2H4v-3Zm0-9h3V4H4c-1.1 0-2 .9-2 2v3h2V6Zm16-2h-3v2h3v3h2V6c0-1.1-.9-2-2-2Zm0 14h-3v2h3c1.1 0 2-.9 2-2v-3h-2v3Z" />
  </Svg>
)

export default Icon
