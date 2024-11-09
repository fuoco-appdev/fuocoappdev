import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M14.4 6 14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6Z" />
  </Svg>
)

export default Icon
