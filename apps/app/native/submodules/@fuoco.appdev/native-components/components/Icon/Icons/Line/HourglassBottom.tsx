import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m18 22-.01-6L14 12l3.99-4.01L18 2H6v6l4 4-4 3.99V22h12ZM8 7.5V4h8v3.5l-4 4-4-4Z" />
  </Svg>
)

export default Icon
