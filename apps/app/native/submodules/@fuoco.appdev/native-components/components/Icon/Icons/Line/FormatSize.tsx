import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M8.5 4.5v3h5v12h3v-12h5v-3h-13Zm-6 8h3v7h3v-7h3v-3h-9v3Z" />
  </Svg>
)

export default Icon
