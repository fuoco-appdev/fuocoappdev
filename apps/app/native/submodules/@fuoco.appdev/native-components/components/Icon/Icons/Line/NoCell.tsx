import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M17.71 6v8.17l2 2V3c0-1.1-.9-1.99-2-1.99L7.71 1c-.85 0-1.58.55-1.87 1.3L9.54 6h8.17Zm-10-3h10v1h-10V3ZM21.9 21.19 3.52 2.81 2.1 4.22l3.61 3.61V21c0 1.1.9 2 2 2h10c.85 0 1.58-.55 1.87-1.3l.91.91 1.41-1.42ZM17.71 21h-10v-1h10v1Zm-10-3V9.83L15.88 18H7.71Z" />
  </Svg>
)

export default Icon
