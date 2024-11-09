import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M9 4H7v2H5v12h2v2h2v-2h2V6H9V4Zm0 12H7V8h2v8Z" />
    <Path d="M19 8h-2V4h-2v4h-2v7h2v5h2v-5h2V8Zm-2 5h-2v-3h2v3Z" />
  </Svg>
)

export default Icon
