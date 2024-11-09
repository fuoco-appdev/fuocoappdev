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
      d="M3 7V5h18v2H3Zm0 4h18V9H3v2Zm18 4H3v-2h18v2Zm0 4H3v-2h18v2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
