import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12.5 3h-7v18h4v-6h3c3.31 0 6-2.69 6-6s-2.69-6-6-6Zm.2 8H9.5V7h3.2c1.1 0 2 .9 2 2s-.9 2-2 2Z" />
  </Svg>
)

export default Icon
