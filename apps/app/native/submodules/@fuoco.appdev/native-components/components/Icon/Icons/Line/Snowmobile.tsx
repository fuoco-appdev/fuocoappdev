import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M22 16.5c0 .55-.45 1-1 1h-.17l-2.2-2.2c1.95-.43 3.37-1.4 3.37-2.8 0-1-8-8-8-8h-3v2h2.25l.8.72L11 9.5l-9-1-2 4 4.54 1.36-3.49 1.88c-1.82.98-1.12 3.76.95 3.76h6c2.21 0 4-1.79 4-4h4l2 2h-3v2h6c1.66 0 3-1.34 3-3h-2Zm-14 1H2l5.25-2.83 2.75.83a2 2 0 0 1-2 2Zm9-4h-6.7l-7.45-2.23.31-.62 8.44.85 3.93-2.94S19.3 12 19.8 12.7c0 0-1.1.8-2.8.8Z" />
  </Svg>
)

export default Icon
