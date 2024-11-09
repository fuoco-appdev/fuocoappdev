import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M3.75 16.67V3.5h16v6h2v-6c0-1.1-.9-2-2-2h-16c-1.1 0-1.99.9-1.99 2l-.01 18 4-4h9v-2H4.92l-1.17 1.17Z" />
    <Path d="M22.25 15.5h-2.2l1.7-4h-5v6h2v5l3.5-7Z" />
  </Svg>
)

export default Icon
