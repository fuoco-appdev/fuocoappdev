import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm-1.41 2L5 17.59V5h12.59ZM6.41 19 19 6.41V19H6.41ZM6 7h5v1.5H6V7Zm10 5.5h-1.5v2h-2V16h2v2H16v-2h2v-1.5h-2v-2Z" />
  </Svg>
)

export default Icon
