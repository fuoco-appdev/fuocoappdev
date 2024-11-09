import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m16.45 11.035-3.54-3.54 1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41-5.64 5.66Zm-5.54-4h-9v2h9v-2Zm10 6.41-1.41-1.41-2.59 2.59-2.59-2.59-1.41 1.41 2.59 2.59-2.59 2.59 1.41 1.41 2.59-2.59 2.59 2.59 1.41-1.41-2.59-2.59 2.59-2.59Zm-10 1.59h-9v2h9v-2Z" />
  </Svg>
)

export default Icon
