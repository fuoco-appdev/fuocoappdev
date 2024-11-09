import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m14.77 8.31.92.92-1.11 1.11 1.41 1.41 2.52-2.52-3.75-3.75L12.24 8l1.41 1.41 1.12-1.1Zm6.65-1.98a.996.996 0 0 0 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29-.26 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83ZM3.52 2.1 2.1 3.51l7.32 7.32-5.71 5.71v3.75h3.75l5.71-5.71 7.32 7.32 1.41-1.41L3.52 2.1Zm3.11 16.19h-.92v-.92l5.13-5.13.92.92-5.13 5.13Z" />
  </Svg>
)

export default Icon
