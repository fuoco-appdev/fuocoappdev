import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m16.81 7.94-3.75-3.75L4 13.25V17h3.75l9.06-9.06ZM6 15v-.92l7.06-7.06.92.92L6.92 15H6Z" />
    <Path d="M19.71 5.04a.996.996 0 0 0 0-1.41l-2.34-2.34a1.001 1.001 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z" />
    <Path d="M22 19H2v4h20v-4Z" />
  </Svg>
)

export default Icon
