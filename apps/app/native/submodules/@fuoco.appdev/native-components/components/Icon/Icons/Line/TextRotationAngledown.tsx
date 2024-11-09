import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M15.625 20.75v-4.24l-1.41 1.41-9.2-9.19-1.41 1.41 9.19 9.19-1.41 1.42h4.24Zm-3.75-12.52 3.54 3.54-.92 2.19 1.48 1.48 4.42-11.14-1.06-1.05-11.14 4.42 1.49 1.48 2.19-.92Zm6.59-3.05-2.23 4.87-2.64-2.64 4.87-2.23Z" />
  </Svg>
)

export default Icon
