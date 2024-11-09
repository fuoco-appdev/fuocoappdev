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
      d="M3 3v2h18V3H3Zm0 6h2V7H3v2Zm4 4h2v-2H7v2Zm0 8h2v-2H7v2Zm6-8h-2v-2h2v2Zm-2 8h2v-2h-2v2Zm-6-4H3v-2h2v2Zm-2 4h2v-2H3v2Zm2-8H3v-2h2v2Zm8 4h-2v-2h2v2Zm6-8h2V7h-2v2Zm2 4h-2v-2h2v2Zm0 4h-2v-2h2v2Zm-6 4h2v-2h-2v2ZM13 9h-2V7h2v2Zm6 12h2v-2h-2v2Zm-2-8h-2v-2h2v2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
