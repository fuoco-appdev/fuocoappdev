import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m5 14.795 1.41 1.41 5.59-5.58 5.59 5.58 1.41-1.41-7-7-7 7Z" />
  </Svg>
)

export default Icon
