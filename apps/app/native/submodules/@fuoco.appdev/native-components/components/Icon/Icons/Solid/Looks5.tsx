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
      d="M5 3h14c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2Zm6 6h4V7H9v6h4v2H9v2h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2V9Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon