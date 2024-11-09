import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm0 16H5V5h14v14Z" />
    <Path d="M9 12H7v5h2v-5Z" />
    <Path d="M17 7h-2v10h2V7Z" />
    <Path d="M13 14h-2v3h2v-3Z" />
    <Path d="M13 10h-2v2h2v-2Z" />
  </Svg>
)

export default Icon
