import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M9.5 6.5v3h-3v-3h3ZM11 5H5v6h6V5Zm-1.5 9.5v3h-3v-3h3ZM11 13H5v6h6v-6Zm6.5-6.5v3h-3v-3h3ZM19 5h-6v6h6V5Zm-6 8h1.5v1.5H13V13Zm1.5 1.5H16V16h-1.5v-1.5ZM16 13h1.5v1.5H16V13Zm-3 3h1.5v1.5H13V16Zm1.5 1.5H16V19h-1.5v-1.5ZM16 16h1.5v1.5H16V16Zm1.5-1.5H19V16h-1.5v-1.5Zm0 3H19V19h-1.5v-1.5ZM22 7h-2V4h-3V2h5v5Zm0 15v-5h-2v3h-3v2h5ZM2 22h5v-2H4v-3H2v5ZM2 2v5h2V4h3V2H2Z" />
  </Svg>
)

export default Icon
