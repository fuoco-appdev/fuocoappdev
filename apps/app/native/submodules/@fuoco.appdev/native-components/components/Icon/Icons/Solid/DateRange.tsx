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
      d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2ZM7 11v2h2v-2H7Zm6 0h-2v2h2v-2Zm4 0v2h-2v-2h2ZM5 20h14V9H5v11Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
