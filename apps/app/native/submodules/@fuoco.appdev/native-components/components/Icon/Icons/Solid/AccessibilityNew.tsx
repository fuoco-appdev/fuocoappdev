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
      d="M14 4c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2Zm-2 3c2.83 0 5.89-.3 8.5-1l.5 2c-1.86.5-4 .83-6 1v13h-2v-6h-2v6H9V9c-2-.17-4.14-.5-6-1l.5-2c2.61.7 5.67 1 8.5 1Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
