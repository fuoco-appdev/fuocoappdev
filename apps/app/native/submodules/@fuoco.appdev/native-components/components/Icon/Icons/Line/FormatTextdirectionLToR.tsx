import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M8 4v4c-1.1 0-2-.9-2-2s.9-2 2-2Zm8-2H8C5.79 2 4 3.79 4 6s1.79 4 4 4v5h2V4h2v11h2V4h2V2Zm0 12v3H4v2h12v3l4-4-4-4Z" />
  </Svg>
)

export default Icon
