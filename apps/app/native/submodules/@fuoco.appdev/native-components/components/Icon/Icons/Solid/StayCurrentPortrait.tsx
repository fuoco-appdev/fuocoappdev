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
      d="m7 1 10 .01c1.1 0 2 .89 2 1.99v18c0 1.1-.9 2-2 2H7c-1.1 0-1.99-.9-1.99-2V3c0-1.1.89-2 1.99-2Zm0 18h10V5H7v14Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
