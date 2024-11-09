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
      d="M19 3H5c-1.1 0-2 .9-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5a2 2 0 0 0-2-2Zm-7 10.51h-1V15H9.5v-1.5h-3V9H8v3h1.5V9H11v3h1v1.51ZM16.5 15h1.7l-2-3 2-3h-1.7l-2 3V9H13v6h1.5v-3l2 3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
