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
      d="M7 5h2V3H7v2Zm0 8h2v-2H7v2Zm2 8H7v-2h2v2Zm2-4h2v-2h-2v2Zm2 4h-2v-2h2v2ZM3 21h2v-2H3v2Zm2-4H3v-2h2v2Zm-2-4h2v-2H3v2Zm2-4H3V7h2v2ZM3 5h2V3H3v2Zm10 8h-2v-2h2v2Zm6 4h2v-2h-2v2Zm2-4h-2v-2h2v2Zm-2 8h2v-2h-2v2Zm2-12h-2V7h2v2ZM11 9h2V7h-2v2Zm8-4V3h2v2h-2Zm-8 0h2V3h-2v2Zm6 16h-2v-2h2v2Zm-2-8h2v-2h-2v2Zm2-8h-2V3h2v2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
