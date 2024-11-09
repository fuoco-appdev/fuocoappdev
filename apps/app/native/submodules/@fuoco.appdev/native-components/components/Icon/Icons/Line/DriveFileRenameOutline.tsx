import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m15 16-4 4h10v-4h-6Z" />
    <Path d="M12.06 7.19 3 16.25V20h3.75l9.06-9.06-3.75-3.75ZM5.92 18H5v-.92l7.06-7.06.92.92L5.92 18Z" />
    <Path d="M18.71 8.04a.996.996 0 0 0 0-1.41l-2.34-2.34a1.001 1.001 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z" />
  </Svg>
)

export default Icon
