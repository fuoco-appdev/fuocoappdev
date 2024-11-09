import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M9.305 5.465v-3.17h6v4h-4v1.17l-2-2Zm10.42 8.83 2.58 2.57-.8.8-6.78-6.78.8-.8 2.75 2.75v-4.54h.6l3.43 3.43-2.58 2.57Zm-.25-1.45 1.13-1.13-1.13-1.13v2.26Zm2.02 7.64-1.41 1.41-3.98-3.98-.58.58-.85-.85.58-.58-3.95-3.94v3.17c0 2.21-1.78 4-3.99 4s-4.01-1.79-4.01-4 1.79-4 4.01-4c.73 0 1.41.21 2 .55v-1.72l-7.62-7.61 1.41-1.41 18.39 18.38Z" />
  </Svg>
)

export default Icon
