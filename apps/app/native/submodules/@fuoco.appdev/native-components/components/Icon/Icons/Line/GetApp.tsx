import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M13 5.5v6h1.17L12 13.67 9.83 11.5H11v-6h2Zm2-2H9v6H5l7 7 7-7h-4v-6Zm4 15H5v2h14v-2Z" />
  </Svg>
)

export default Icon
