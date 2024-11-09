import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M10.5 15H8v-3h2.5V9.5h3V12H16v3h-2.5v2.5h-3V15ZM19 8v11c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2Zm-2 0H7v11h10V8Zm1-5H6v2h12V3Z" />
  </Svg>
)

export default Icon
