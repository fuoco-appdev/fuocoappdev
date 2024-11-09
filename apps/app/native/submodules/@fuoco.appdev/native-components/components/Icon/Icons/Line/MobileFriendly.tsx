import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M18.905 1h-10c-1.1 0-2 .9-2 2v3h2V4h10v16h-10v-2h-2v3c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2ZM6.915 13.47l-2.55-2.55-1.27 1.27L6.905 16l7.19-7.19-1.27-1.27-5.91 5.93Z" />
  </Svg>
)

export default Icon
