import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m12 7.77 4.28 10.43-3.47-1.53-.81-.36-.81.36-3.47 1.53L12 7.77Zm0-5.27L4.5 20.79l.71.71 6.79-3 6.79 3 .71-.71L12 2.5Z" />
  </Svg>
)

export default Icon
