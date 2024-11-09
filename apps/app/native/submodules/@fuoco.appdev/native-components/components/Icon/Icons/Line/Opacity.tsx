import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M17.66 7.995 12 2.345l-5.66 5.65A8.02 8.02 0 0 0 4 13.635c0 2 .78 4.11 2.34 5.67a7.99 7.99 0 0 0 11.32 0c1.56-1.56 2.34-3.67 2.34-5.67s-.78-4.08-2.34-5.64Zm-11.66 6c.01-2 .62-3.27 1.76-4.4L12 5.265l4.24 4.38c1.14 1.12 1.75 2.35 1.76 4.35H6Z" />
  </Svg>
)

export default Icon
