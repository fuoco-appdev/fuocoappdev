import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12 7.77 18.39 18H5.61L12 7.77ZM12 4 2 20h20L12 4Z" />
  </Svg>
)

export default Icon
