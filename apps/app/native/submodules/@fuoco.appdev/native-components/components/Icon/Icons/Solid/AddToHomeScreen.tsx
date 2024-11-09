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
      d="m8 1 10 .01c1.1 0 2 .89 2 1.99v18c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2v-3h2v1h10V5H8v1H6V3c0-1.1.9-2 2-2Zm4 14h-2v-3.59L4.41 17 3 15.59 8.59 10H5V8h7v7Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
