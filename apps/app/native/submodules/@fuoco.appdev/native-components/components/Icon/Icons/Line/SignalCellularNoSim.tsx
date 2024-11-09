import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M11.01 4.19h6.17v9.11l2 2V4.19c0-1.1-.9-2-2-2h-7L8.12 4.25l1.42 1.42 1.47-1.48ZM21.44 20.4 3.97 2.93 2.56 4.34l2.62 2.62v11.23a2 2 0 0 0 2 2h11.23l1.62 1.62 1.41-1.41ZM7.18 18.19V8.98l9.23 9.21H7.18Z" />
  </Svg>
)

export default Icon
