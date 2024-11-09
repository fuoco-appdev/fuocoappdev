import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M14.25 9.86 17.28 12l-3.03 2.14V9.86Zm-9 0L8.28 12l-3.03 2.14V9.86Zm7-3.86v12l8.5-6-8.5-6Zm-9 0v12l8.5-6-8.5-6Z" />
  </Svg>
)

export default Icon
