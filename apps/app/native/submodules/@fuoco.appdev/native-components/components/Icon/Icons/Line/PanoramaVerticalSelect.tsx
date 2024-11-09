import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M18.498 12c0-3.89.84-6.95 1.43-8.69a.993.993 0 0 0-.95-1.31H4.998c-.68 0-1.16.66-.95 1.31.69 2.05 1.45 4.79 1.45 8.69 0 3.87-.76 6.66-1.45 8.69-.21.65.27 1.31.95 1.31h14c.68 0 1.17-.66.95-1.31-.68-2.03-1.45-4.83-1.45-8.69Z" />
  </Svg>
)

export default Icon
