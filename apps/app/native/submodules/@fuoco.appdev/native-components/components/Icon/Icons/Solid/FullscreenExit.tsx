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
      d="M5 8h3V5h2v5H5V8Zm3 8H5v-2h5v5H8v-3Zm6 3h2v-3h3v-2h-5v5Zm2-14v3h3v2h-5V5h2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
