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
      d="M3 8V6h18v2H3Zm0 5h18v-2H3v2Zm0 5h18v-2H3v2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
