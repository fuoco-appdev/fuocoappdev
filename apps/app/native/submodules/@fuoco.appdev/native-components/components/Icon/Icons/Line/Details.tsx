import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12 3 2 21h20L12 3Zm1 5.92L18.6 19H13V8.92Zm-2 0V19H5.4L11 8.92Z" />
  </Svg>
)

export default Icon
