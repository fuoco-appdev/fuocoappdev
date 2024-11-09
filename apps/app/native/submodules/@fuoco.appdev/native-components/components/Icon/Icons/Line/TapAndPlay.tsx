import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M3.5 16v2c2.76 0 5 2.24 5 5h2c0-3.87-3.13-7-7-7Zm0 4v3h3c0-1.66-1.34-3-3-3Zm0-8v2a9 9 0 0 1 9 9h2c0-6.08-4.92-11-11-11Zm15-10.99L8.5 1c-1.1 0-2 .9-2 2v7.37c.69.16 1.36.37 2 .64V5h10v13h-3.03c.52 1.25.84 2.59.95 4h2.08c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99Z" />
  </Svg>
)

export default Icon
