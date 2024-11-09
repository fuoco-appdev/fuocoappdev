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
      d="M3 5V3h18v2H3Zm12 2H3v2h12V7Zm0 8H3v2h12v-2Zm6-2H3v-2h18v2ZM3 21h18v-2H3v2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
