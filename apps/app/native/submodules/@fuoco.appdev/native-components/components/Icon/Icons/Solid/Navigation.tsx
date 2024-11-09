import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12 2 4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2Z" />
  </Svg>
)

export default Icon
