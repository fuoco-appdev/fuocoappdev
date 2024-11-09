import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M20.5 11v2h-4v1H19c.83 0 1.5.68 1.5 1.5v2c0 .83-.67 1.5-1.5 1.5h-4.5v-2h4v-1H16c-.82 0-1.5-.68-1.5-1.5v-2c0-.82.68-1.5 1.5-1.5h4.5Zm-17-6v3h6v2.5h-6v3h6V16h-6v3h6c1.66 0 3-1.34 3-3v-1.9a2.1 2.1 0 0 0-2.1-2.1 2.1 2.1 0 0 0 2.1-2.1V8c0-1.66-1.34-3-3-3h-6Z" />
  </Svg>
)

export default Icon
