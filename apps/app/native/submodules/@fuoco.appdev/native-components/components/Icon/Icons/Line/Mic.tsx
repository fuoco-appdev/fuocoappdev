import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12 14.5c1.66 0 3-1.34 3-3v-6c0-1.66-1.34-3-3-3s-3 1.34-3 3v6c0 1.66 1.34 3 3 3Z" />
    <Path d="M17 11.5c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92v3.08h2v-3.08c3.39-.49 6-3.39 6-6.92h-2Z" />
  </Svg>
)

export default Icon
