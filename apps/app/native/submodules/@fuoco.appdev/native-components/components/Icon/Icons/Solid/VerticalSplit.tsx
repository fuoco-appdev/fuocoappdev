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
      d="M3 5v2h8V5H3Zm8 6H3V9h8v2Zm-8 4h8v-2H3v2Zm0 4h8v-2H3v2ZM21 5h-8v14h8V5Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
