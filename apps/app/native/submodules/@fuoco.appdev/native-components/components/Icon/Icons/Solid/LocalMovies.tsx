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
      d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2ZM8 17H6v-2h2v2Zm-2-4h2v-2H6v2Zm2-4H6V7h2v2Zm8 8h2v-2h-2v2Zm2-4h-2v-2h2v2Zm-2-4h2V7h-2v2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
