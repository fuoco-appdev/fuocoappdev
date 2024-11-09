import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M6.115 20.23 7.885 22l10-10-10-10-1.77 1.77 8.23 8.23-8.23 8.23Z" />
  </Svg>
)

export default Icon
