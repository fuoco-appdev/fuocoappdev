import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M20.93 3.34v12h-1.34l1.91 1.91a2.01 2.01 0 0 0 1.43-1.91v-12c0-1.1-.9-2-2-2H5.59l2 2h13.34Zm-14 8h2v2h-2v-2Zm12-3h-6.34l2 2h4.34v-2Zm0-3h-8v1.34l.66.66h7.34v-2ZM2.34.93.93 2.34l2.01 2.01-.01 16.99 4-4h9l5.73 5.73 1.41-1.41L2.34.93ZM6.1 15.34l-1.17 1.17V6.34l2 2v2h2l5 5H6.1Z" />
  </Svg>
)

export default Icon
