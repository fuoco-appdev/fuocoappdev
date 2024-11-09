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
      d="M22 7v2h-2v2h2v2h-2v2h2v2h-2v2c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v2h2ZM4 19h14V5H4v14Zm2-6h5v4H6v-4Zm10-6h-4v3h4V7ZM6 7h5v5H6V7Zm10 4h-4v6h4v-6Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
