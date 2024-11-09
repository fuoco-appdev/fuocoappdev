import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M3.52 2.505 2.1 3.915l6.61 6.61v11.17h8v-3.17l3.78 3.78 1.41-1.41L3.52 2.505Zm11.19 17.19h-4v-7.17l4 4v3.17Z" />
    <Path d="M16.71 3.695v1H8.54l2 2h6.17v.39l-2 3.01v.77l2 2v-2.17l2-3v-6h-12v1.17l.83.83h9.17Z" />
  </Svg>
)

export default Icon
