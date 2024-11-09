import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2 .01 7Z" />
  </Svg>
)

export default Icon
