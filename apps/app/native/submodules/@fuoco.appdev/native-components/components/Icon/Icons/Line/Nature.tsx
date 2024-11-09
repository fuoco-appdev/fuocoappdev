import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12.915 16.035h-.03c3.49-.4 6.2-3.36 6.2-6.95 0-3.87-3.13-7-7-7s-7 3.13-7 7a6.98 6.98 0 0 0 5.83 6.89v3.94h-6v2h14v-2h-6v-3.88Zm-5.83-6.95c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5-5-2.24-5-5Z" />
  </Svg>
)

export default Icon
