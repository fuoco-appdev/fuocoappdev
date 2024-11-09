import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path
      fillRule="evenodd"
      d="m0 3 1.27-1.27L22 22.46l-1.27 1.27L15 18H6l-4 4 .01-16.99L0 3Zm6 11h2v-2H6v2Zm0-3V9l2 2H6ZM4.08 2H20c1.1 0 2 .9 2 2v12c0 1.08-.86 1.95-1.93 1.99L13.08 11H18V9h-6.92l-1-1H18V6h-8v1.92L4.08 2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
