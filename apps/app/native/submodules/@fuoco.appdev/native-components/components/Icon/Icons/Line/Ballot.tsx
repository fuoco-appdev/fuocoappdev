import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M13 7.5h5v2h-5v-2Zm0 7h5v2h-5v-2ZM19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm0 16H5V5h14v14ZM11 6H6v5h5V6Zm-1 4H7V7h3v3Zm1 3H6v5h5v-5Zm-1 4H7v-3h3v3Z" />
  </Svg>
)

export default Icon
