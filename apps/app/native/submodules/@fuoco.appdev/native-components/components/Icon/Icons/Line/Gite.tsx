import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M18 6.5H9v-2H7v2H6l-4 4v9h20v-9l-4-4Zm-14 6h10v5H4v-5Zm16 5h-4v-6.17l2-2 2 2v6.17Z" />
  </Svg>
)

export default Icon
