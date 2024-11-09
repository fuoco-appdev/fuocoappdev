import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m16.51 8.38 1.41 1.41-9.19 9.19 1.41 1.41 9.19-9.19 1.42 1.42V8.38h-4.24Zm-8.28 3.75 3.54-3.54 2.19.92 1.48-1.48L4.31 3.61 3.25 4.67l4.42 11.14 1.48-1.48-.92-2.2Zm-.82-1.72L5.18 5.54l4.87 2.23-2.64 2.64Z" />
  </Svg>
)

export default Icon
