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
      d="M20 3H4c-1.1 0-1.99.9-1.99 2L2 15c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm-9 3h2v2h-2V6Zm2 3h-2v2h2V9ZM8 6h2v2H8V6Zm2 3H8v2h2V9Zm-3 2H5V9h2v2ZM5 8h2V6H5v2Zm11 7H8v-2h8v2Zm-2-4h2V9h-2v2Zm2-3h-2V6h2v2Zm1 3h2V9h-2v2Zm2-3h-2V6h2v2Zm-7 15-4-4h8l-4 4Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
