import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m17 20.455 1.41-1.41-3.41-3.41-1.41 1.41 3.41 3.41ZM7.5 8.045H11v5.59l-5.41 5.41L7 20.455l6-6v-6.41h3.5l-4.5-4.5-4.5 4.5Z" />
  </Svg>
)

export default Icon
