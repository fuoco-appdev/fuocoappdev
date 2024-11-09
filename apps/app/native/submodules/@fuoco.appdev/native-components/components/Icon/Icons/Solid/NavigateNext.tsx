import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M10.02 6 8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6Z" />
  </Svg>
)

export default Icon
