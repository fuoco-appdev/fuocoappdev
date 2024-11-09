import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M18.62 18h-5.24l2-4H13V6h8v7.24L18.62 18Zm-2-2h.76L19 12.76V8h-4v4h3.62l-2 4Zm-8 2H3.38l2-4H3V6h8v7.24L8.62 18Zm-2-2h.76L9 12.76V8H5v4h3.62l-2 4Z" />
  </Svg>
)

export default Icon
