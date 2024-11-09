import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm0 16H5l4-4 4 4 6-6v6Zm0-8.5-6 6-4-4-4 4V5h14v5.5ZM13.5 9V6H12v6h1.5V9Zm3.7 3-2-3 2-3h-1.7l-2 3 2 3h1.7ZM11 10.5H8.5v-.75H11V6H7v1.5h2.5v.75H7V12h4v-1.5Z" />
  </Svg>
)

export default Icon
