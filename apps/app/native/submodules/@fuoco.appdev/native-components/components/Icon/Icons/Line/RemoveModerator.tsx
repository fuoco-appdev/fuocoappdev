import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m12.71 3.835 6 2.25v4.7c0 1.19-.23 2.36-.64 3.44l1.51 1.51c.72-1.53 1.13-3.22 1.13-4.95v-6.09l-8-3-5.22 1.96 1.55 1.55 3.67-1.37Zm-9.19-1.33L2.1 3.915l2.61 2.61v4.26c0 5.05 3.41 9.76 8 10.91 1.72-.43 3.28-1.36 4.55-2.62l3.23 3.23 1.41-1.41L3.52 2.505Zm9.19 17.11c-3.45-1.13-6-4.82-6-8.83v-2.26l9.14 9.14c-.9.88-1.97 1.57-3.14 1.95Z" />
  </Svg>
)

export default Icon
