import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M10 19.5h4v-3h-4v3Zm-5-15v3h5v3h4v-3h5v-3H5Zm-2 10h18v-2H3v2Z" />
  </Svg>
)

export default Icon
