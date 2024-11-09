import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M6 6h2v12H6V6Zm3.5 6 8.5 6V6l-8.5 6Zm6.5 2.14L12.97 12 16 9.86v4.28Z" />
  </Svg>
)

export default Icon
