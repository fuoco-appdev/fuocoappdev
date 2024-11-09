import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19 12h-1V4H6v8H5c-1.66 0-3 1.34-3 3v5h20v-5c0-1.66-1.34-3-3-3ZM8 6h8v6H8V6Zm12 12H4v-3c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v3Z" />
    <Path d="M18 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
  </Svg>
)

export default Icon
