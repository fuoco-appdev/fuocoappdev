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
      d="M3 6v2h18V6H3Zm0 12h6v-2H3v2Zm12-5H3v-2h12v2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
