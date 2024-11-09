import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m12 17.77 6.18 3.73-1.64-7.03L22 9.74l-7.19-.61L12 2.5 9.19 9.13 2 9.74l5.46 4.73-1.64 7.03L12 17.77Z" />
  </Svg>
)

export default Icon
