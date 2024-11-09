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
      d="M3 3v18h18V3H3Zm10 4h-2v2h2V7Zm0 4h-2v2h2v-2Zm2 0h2v2h-2v-2ZM5 19h14V5H5v14Zm8-4h-2v2h2v-2Zm-6-4h2v2H7v-2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
