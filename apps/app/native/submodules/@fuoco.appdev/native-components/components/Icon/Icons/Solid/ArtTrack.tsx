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
      d="M10 7c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2h6Zm12 0h-8v2h8V7Zm0 6h-8v-2h8v2Zm0 4h-8v-2h8v2ZM8.25 12l2.25 3h-7l1.75-2.25 1.25 1.51L8.25 12Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
