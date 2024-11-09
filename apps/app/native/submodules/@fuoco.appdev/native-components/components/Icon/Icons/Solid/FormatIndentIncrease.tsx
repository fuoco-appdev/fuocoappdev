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
      d="M3 5V3h18v2H3Zm4 7-4 4V8l4 4Zm14 9H3v-2h18v2Zm-10-4h10v-2H11v2Zm0-8h10V7H11v2Zm10 4H11v-2h10v2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
