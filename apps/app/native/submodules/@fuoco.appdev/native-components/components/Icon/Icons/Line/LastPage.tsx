import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m5.795 7.41 4.59 4.59-4.59 4.59L7.205 18l6-6-6-6-1.41 1.41ZM16.205 6h2v12h-2V6Z" />
  </Svg>
)

export default Icon
