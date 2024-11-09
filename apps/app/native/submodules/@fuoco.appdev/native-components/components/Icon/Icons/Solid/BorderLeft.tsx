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
      d="M5 21H3V3h2v18Zm8-16h-2V3h2v2Zm-2 12h2v-2h-2v2Zm0 4h2v-2h-2v2Zm0-12h2V7h-2v2Zm2 4h-2v-2h2v2Zm-6 8h2v-2H7v2ZM9 5H7V3h2v2Zm-2 8h2v-2H7v2Zm12-4h2V7h-2v2Zm-2 12h-2v-2h2v2Zm2-4h2v-2h-2v2Zm0-12V3h2v2h-2Zm0 8h2v-2h-2v2Zm2 8h-2v-2h2v2Zm-6-8h2v-2h-2v2Zm2-8h-2V3h2v2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
