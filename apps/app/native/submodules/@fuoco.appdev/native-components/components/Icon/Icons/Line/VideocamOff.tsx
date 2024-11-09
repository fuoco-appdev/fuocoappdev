import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m9.99 8.57-2-2-4.15-4.14-1.41 1.41 2.73 2.73h-.73c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.21 0 .39-.08.55-.18l3.18 3.18 1.41-1.41-8.86-8.86-2.72-2.73Zm-4.56 8v-8h1.73l8 8H5.43Zm10-8v2.61l6 6V7.07l-4 4v-3.5c0-.55-.45-1-1-1h-5.61l2 2h2.61Z" />
  </Svg>
)

export default Icon
