import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M18.71 14.46v-.17h2v2.17l-2-2Zm-2.59-2.58 1.59-1.59-1.41-1.41-1.59 1.58 1.41 1.42Zm-2.41-2.42V3.29h-2v4.17l2 2Zm8.19 11.02L3.52 2.1 2.1 3.51 8.29 9.7l-.58.59 5 5 .59-.59 2.58 2.59H6.71v-3h-2v3c0 1.1.9 2 2 2h11.17l2.61 2.61 1.41-1.42Z" />
  </Svg>
)

export default Icon
