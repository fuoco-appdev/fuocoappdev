import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M16.5 10V9h-2v1H12v1.5h1v4c0 .83.67 1.5 1.5 1.5h2c.83 0 1.5-.67 1.5-1.5v-4h1V10h-2.5Zm0 5.5h-2v-4h2v4ZM20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2Zm0 12H4V6h5.17l2 2H20v10Z" />
  </Svg>
)

export default Icon
