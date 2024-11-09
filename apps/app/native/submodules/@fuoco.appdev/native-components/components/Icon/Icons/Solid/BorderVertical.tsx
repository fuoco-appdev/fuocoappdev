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
      d="M3 5h2V3H3v2Zm0 4h2V7H3v2Zm6 12H7v-2h2v2Zm-2-8h2v-2H7v2Zm-2 0H3v-2h2v2Zm-2 8h2v-2H3v2Zm2-4H3v-2h2v2ZM7 5h2V3H7v2Zm14 12h-2v-2h2v2Zm-10 4h2V3h-2v18Zm10 0h-2v-2h2v2Zm-2-8h2v-2h-2v2Zm0-8V3h2v2h-2Zm0 4h2V7h-2v2Zm-2-4h-2V3h2v2Zm-2 16h2v-2h-2v2Zm2-8h-2v-2h2v2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
