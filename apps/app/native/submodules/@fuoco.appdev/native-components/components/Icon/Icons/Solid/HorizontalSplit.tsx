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
      d="M3 7V5h18v2H3Zm0 4h18V9H3v2Zm0 8h18v-6H3v6Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
