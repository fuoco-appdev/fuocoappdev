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
      d="M3 3v18h18V3H3Zm8 16H5v-6h6v6Zm-6-8h6V5H5v6Zm14 8h-6v-6h6v6Zm-6-8h6V5h-6v6Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
