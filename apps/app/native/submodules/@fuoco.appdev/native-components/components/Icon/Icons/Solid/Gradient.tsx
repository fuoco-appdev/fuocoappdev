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
      d="M5 3h14c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2Zm2 6h2v2H7V9Zm0 4v-2H5V5h14v6h-2V9h-2v2h-2V9h-2v2H9v2H7Zm0 0H5v2h2v-2Zm4 0v-2h2v2h-2Zm4 0v-2h2v2h-2Zm2 0v2h2v-2h-2Zm-2 0v2h-2v-2h2Zm-4 0v2H9v-2h2Zm-2 5H7v-2h2v2Zm2 0h2v-2h-2v2Zm6 0h-2v-2h2v2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
