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
      d="M19.99 4c0-1.1-.89-2-1.99-2h-8L4 8v12c0 1.1.9 2 2 2h12.01c1.1 0 1.99-.9 1.99-2l-.01-16ZM9 19H7v-2h2v2Zm6 0h2v-2h-2v2Zm-6-4H7v-4h2v4Zm2 4h2v-4h-2v4Zm2-6h-2v-2h2v2Zm2 2h2v-4h-2v4Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
