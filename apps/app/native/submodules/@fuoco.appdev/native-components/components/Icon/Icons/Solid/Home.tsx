import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5Z" />
  </Svg>
)

export default Icon
