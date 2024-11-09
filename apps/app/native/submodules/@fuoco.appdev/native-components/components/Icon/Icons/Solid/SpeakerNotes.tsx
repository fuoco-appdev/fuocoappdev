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
      d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2ZM8 14H6v-2h2v2Zm-2-3h2V9H6v2Zm2-3H6V6h2v2Zm2 6h5v-2h-5v2Zm8-3h-8V9h8v2Zm-8-3h8V6h-8v2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
