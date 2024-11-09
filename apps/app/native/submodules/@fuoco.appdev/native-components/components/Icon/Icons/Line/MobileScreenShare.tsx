import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M16.995 1h-10c-1.1 0-1.99.85-1.99 1.95v18c0 1.1.89 2.05 1.99 2.05h10c1.1 0 2-.95 2-2.05v-18c0-1.1-.9-1.95-2-1.95Zm0 18h-10V5h10v14Zm-4.2-5.76v1.75l3.2-2.99-3.2-2.98v1.7c-3.11.43-4.35 2.56-4.8 4.7 1.11-1.5 2.58-2.18 4.8-2.18Z" />
  </Svg>
)

export default Icon
