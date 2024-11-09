import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M17.885 3.77 16.115 2l-10 10 10 10 1.77-1.77L9.655 12l8.23-8.23Z" />
  </Svg>
)

export default Icon
