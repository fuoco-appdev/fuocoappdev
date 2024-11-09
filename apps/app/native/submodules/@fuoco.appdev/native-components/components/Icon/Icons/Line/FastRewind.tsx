import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M18.75 9.86v4.28L15.72 12l3.03-2.14Zm-9 0v4.28L6.72 12l3.03-2.14Zm11-3.86-8.5 6 8.5 6V6Zm-9 0-8.5 6 8.5 6V6Z" />
  </Svg>
)

export default Icon
