import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M1.5 4.5h14l-6 9v4h2v2h-6v-2h2v-4l-6-9Zm9.1 4 1.4-2H4.99l1.4 2h4.21Zm6.9-4h5v3h-3v9c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3a3 3 0 0 1 1 .17V4.5Z" />
  </Svg>
)

export default Icon
