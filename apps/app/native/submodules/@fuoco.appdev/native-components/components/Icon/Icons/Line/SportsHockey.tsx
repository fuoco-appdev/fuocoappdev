import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M2 17v3h2v-4H3c-.55 0-1 .45-1 1Z" />
    <Path d="M9 16H5v4l4.69-.01c.38 0 .72-.21.89-.55l.87-1.9-1.59-3.48L9 16Z" />
    <Path d="M21.71 16.29A.997.997 0 0 0 21 16h-1v4h2v-3c0-.28-.11-.53-.29-.71Z" />
    <Path d="M13.6 12.84 17.65 4H14.3l-1.76 3.97-.49 1.1-.05.14L9.7 4H6.35l5.57 12.16.08.18 1.42 3.1c.17.34.51.55.89.55L19 20v-4h-4l-1.4-3.16Z" />
  </Svg>
)

export default Icon
