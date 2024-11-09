import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M10 4v4c-1.1 0-2-.9-2-2s.9-2 2-2Zm8-2h-8C7.79 2 6 3.79 6 6s1.79 4 4 4v5h2V4h2v11h2V4h2V2ZM8 14l-4 4 4 4v-3h12v-2H8v-3Z" />
  </Svg>
)

export default Icon
