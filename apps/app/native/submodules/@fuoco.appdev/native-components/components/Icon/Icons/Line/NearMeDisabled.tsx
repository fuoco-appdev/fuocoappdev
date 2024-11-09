import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m11.295 7.045 9-3.34-3.34 9-1.56-1.56 1.5-4.05-4.05 1.5-1.55-1.55Zm9.19 14.85-5.07-5.07-1.81 4.88h-1.41l-2.83-7.07-7.07-2.83v-1.41l4.88-1.81-5.07-5.07 1.41-1.41 18.38 18.38-1.41 1.41Zm-6.62-6.62-5.14-5.14-2.71 1.01 4.89 1.95 1.95 4.89 1.01-2.71Z" />
  </Svg>
)

export default Icon
