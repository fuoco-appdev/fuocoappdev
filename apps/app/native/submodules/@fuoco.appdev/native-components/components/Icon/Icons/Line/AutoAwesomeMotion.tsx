import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M14 2H4c-1.1 0-2 .9-2 2v10h2V4h10V2Zm4 4H8c-1.1 0-2 .9-2 2v10h2V8h10V6Zm2 4h-8c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2Zm0 10h-8v-8h8v8Z" />
  </Svg>
)

export default Icon
