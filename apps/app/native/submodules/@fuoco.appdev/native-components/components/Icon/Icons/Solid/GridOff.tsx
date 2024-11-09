import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path
      fillRule="evenodd"
      d="m0 2.448 1.41-1.354 21.46 20.602-1.41 1.354-2.01-1.93H4c-1.1 0-2-.864-2-1.92V4.368l-2-1.92ZM8 3.84v.854l2 1.92V3.84h4v3.84h-2.89l2 1.92H14v.854l2 1.92V9.6h4v3.84h-2.89l2 1.92H20v.854l2 1.92V3.84c0-1.056-.9-1.92-2-1.92H5.11l2 1.92H8Zm8 0h4v3.84h-4V3.84Zm-6 8.208 1.45 1.392H10v-1.392ZM5.45 7.68 4 6.288V7.68h1.45ZM8 19.2H4v-3.84h4v3.84Zm-4-5.76h4v-3.312L7.45 9.6H4v3.84Zm10 5.76h-4v-3.84h3.45l.55.528V19.2Zm2-1.392V19.2h1.45L16 17.808Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
