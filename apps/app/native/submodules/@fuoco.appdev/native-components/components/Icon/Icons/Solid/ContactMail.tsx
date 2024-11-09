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
      d="M22 3H2C.9 3 0 3.9 0 5v14c0 1.1.9 2 2 2h20c1.1 0 1.99-.9 1.99-2L24 5c0-1.1-.9-2-2-2Zm-1 5V7l-3 2-3-2v1l3 2 3-2ZM11 9c0-1.66-1.34-3-3-3S5 7.34 5 9s1.34 3 3 3 3-1.34 3-3Zm-9 9v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H2Zm12-6h8V6h-8v6Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
