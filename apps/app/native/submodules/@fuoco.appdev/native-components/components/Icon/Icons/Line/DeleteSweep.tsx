import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M15 16h4v2h-4v-2Zm0-8h7v2h-7V8Zm0 4h6v2h-6v-2ZM3 18c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V8H3v10Zm2-8h6v8H5v-8Zm5-6H6L5 5H2v2h12V5h-3l-1-1Z" />
  </Svg>
)

export default Icon
